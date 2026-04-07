'use client';

import { useState, useEffect, useCallback } from 'react';
import { Plus, Search, Pencil, Trash2, User, Mail, Phone, MapPin, Calendar, RefreshCw } from 'lucide-react';
import PersonForm from '@/components/PersonForm';

interface Person {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  age: number | null;
  address: string | null;
  createdAt: string;
}

export default function Home() {
  const [user, setUser] = useState<any>(null); // current logged-in user
  const [persons, setPersons] = useState<Person[]>([]);
  const [filtered, setFiltered] = useState<Person[]>([]);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editPerson, setEditPerson] = useState<Person | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Fetch user session (do not block rendering)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/auth/session');
        const session = await res.json();
        setUser(session?.user || null);
      } catch {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  const fetchPersons = useCallback(async () => {
    if (!user) return; // don’t fetch if not logged in
    try {
      const res = await fetch('/api/persons');
      const data = await res.json();
      const list = Array.isArray(data) ? data : [];
      setPersons(list);
      setFiltered(list);
    } catch {
      setPersons([]);
      setFiltered([]);
    }
  }, [user]);

  // Fetch persons when user logs in
  useEffect(() => {
    fetchPersons();
  }, [user, fetchPersons]);

  // Filter persons by search
  useEffect(() => {
    const q = search.toLowerCase();
    setFiltered(
      persons.filter((p) =>
        `${p.firstName} ${p.lastName} ${p.email} ${p.address || ''}`.toLowerCase().includes(q)
      )
    );
  }, [search, persons]);

  async function handleDelete(id: number) {
    setDeleteLoading(true);
    try {
      await fetch(`/api/persons/${id}`, { method: 'DELETE' });
      fetchPersons();
    } finally {
      setDeleteLoading(false);
      setDeleteId(null);
    }
  }

  function getInitials(first: string, last: string) {
    return `${first[0]}${last[0]}`.toUpperCase();
  }

  const colors = ['bg-purple-500', 'bg-blue-500', 'bg-green-500', 'bg-pink-500', 'bg-orange-500', 'bg-teal-500'];
  function getColor(id: number) { return colors[id % colors.length]; }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <p className="text-xs font-mono text-accent uppercase tracking-widest mb-1">Person Management</p>
        <h1 className="font-display text-4xl font-bold mb-2">
          All <span className="gradient-text">Persons</span>
        </h1>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-custom" />
          <input
            type="text"
            placeholder="Search by name, email, or address..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-card-surface border border-custom text-sm placeholder:text-muted-custom focus:outline-none focus:border-accent transition-colors"
          />
        </div>

        {user && (
          <>
            <button
              onClick={fetchPersons}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-custom bg-card-surface text-sm hover:bg-muted-surface transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>

            <button
              onClick={() => { setEditPerson(null); setShowForm(true); }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-white text-sm font-medium hover:opacity-90 transition-all"
            >
              <Plus className="w-4 h-4" />
              Add Person
            </button>
          </>
        )}
      </div>

      {/* Guest view */}
      {!user && (
        <p className="text-center text-muted-custom py-24">
          You must be logged in to view persons.
        </p>
      )}

      {/* Table / Cards */}
      {user && filtered.length > 0 && (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block rounded-2xl bg-card-surface border border-custom overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-custom bg-muted-surface">
                  {['Person', 'Email', 'Phone', 'Age', 'Address', 'Actions'].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-mono text-muted-custom uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((person, i) => (
                  <tr
                    key={person.id}
                    className={`border-b border-custom hover:bg-muted-surface/50 transition-colors ${i === filtered.length - 1 ? 'border-0' : ''}`}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg ${getColor(person.id)} flex items-center justify-center text-white text-xs font-bold`}>
                          {getInitials(person.firstName, person.lastName)}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{person.firstName} {person.lastName}</p>
                          <p className="text-xs text-muted-custom font-mono">ID #{person.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-custom">{person.email}</td>
                    <td className="px-4 py-3 text-sm text-muted-custom">{person.phone || '—'}</td>
                    <td className="px-4 py-3 text-sm text-muted-custom">{person.age || '—'}</td>
                    <td className="px-4 py-3 text-sm text-muted-custom max-w-[200px] truncate">{person.address || '—'}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => { setEditPerson(person); setShowForm(true); }}
                          className="w-7 h-7 rounded-lg border border-custom hover:border-accent hover:text-accent flex items-center justify-center transition-colors"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteId(person.id)}
                          className="w-7 h-7 rounded-lg border border-custom hover:border-red-400 hover:text-red-400 flex items-center justify-center transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-3">
            {filtered.map((person) => (
              <div key={person.id} className="p-4 rounded-2xl bg-card-surface border border-custom card-hover">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl ${getColor(person.id)} flex items-center justify-center text-white font-bold`}>
                      {getInitials(person.firstName, person.lastName)}
                    </div>
                    <div>
                      <p className="font-medium">{person.firstName} {person.lastName}</p>
                      <p className="text-xs text-muted-custom font-mono">ID #{person.id}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => { setEditPerson(person); setShowForm(true); }}
                      className="w-8 h-8 rounded-lg border border-custom hover:border-accent hover:text-accent flex items-center justify-center transition-colors"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setDeleteId(person.id)}
                      className="w-8 h-8 rounded-lg border border-custom hover:border-red-400 hover:text-red-400 flex items-center justify-center transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <div className="space-y-1.5 text-sm text-muted-custom">
                  <p className="flex items-center gap-2"><Mail className="w-3.5 h-3.5" />{person.email}</p>
                  {person.phone && <p className="flex items-center gap-2"><Phone className="w-3.5 h-3.5" />{person.phone}</p>}
                  {person.address && <p className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5" />{person.address}</p>}
                  {person.age && <p className="flex items-center gap-2"><Calendar className="w-3.5 h-3.5" />Age: {person.age}</p>}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Person Form Modal */}
      {user && showForm && (
        <PersonForm
          person={editPerson
            ? { ...editPerson, phone: editPerson.phone || '', age: editPerson.age?.toString() || '', address: editPerson.address || '' }
            : undefined}
          onClose={() => { setShowForm(false); setEditPerson(null); }}
          onSave={fetchPersons}
        />
      )}

      {/* Delete Confirm Modal */}
      {user && deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-card-surface border border-custom rounded-2xl p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-6 h-6 text-red-400" />
            </div>
            <h3 className="font-display font-semibold text-lg mb-2">Delete Person?</h3>
            <p className="text-sm text-muted-custom mb-6">
              This action cannot be undone. The record will be permanently removed.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-custom text-sm font-medium hover:bg-muted-surface transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                disabled={deleteLoading}
                className="flex-1 px-4 py-2.5 rounded-xl bg-red-500 text-white text-sm font-medium hover:opacity-90 transition-all disabled:opacity-50"
              >
                {deleteLoading ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};