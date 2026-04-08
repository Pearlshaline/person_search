'use client';

import { useState } from 'react';
import { X, Save, User } from 'lucide-react';

interface Person {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: string;
  address: string;
}

interface Props {
  person?: Person;
  onClose: () => void;
  onSave: () => void;
}

export default function PersonForm({ person, onClose, onSave }: Props) {
  const isEdit = !!person?.id;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    firstName: person?.firstName || '',
    lastName: person?.lastName || '',
    email: person?.email || '',
    phone: person?.phone || '',
    age: person?.age?.toString() || '',
    address: person?.address || '',
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const url = isEdit ? `/api/persons/${person.id}` : '/api/persons';
      const method = isEdit ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Something went wrong'); return; }
      onSave();
      onClose();
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  const fields = [
    { key: 'firstName', label: 'First Name', type: 'text', placeholder: 'e.g. Maria', required: true, full: false },
    { key: 'lastName', label: 'Last Name', type: 'text', placeholder: 'e.g. Santos', required: true, full: false },
    { key: 'email', label: 'Email Address', type: 'email', placeholder: 'e.g. maria@email.com', required: true, full: true },
    { key: 'phone', label: 'Phone Number', type: 'text', placeholder: 'e.g. +63 912 345 6789', required: false, full: false },
    { key: 'age', label: 'Age', type: 'number', placeholder: 'e.g. 25', required: false, full: false },
    { key: 'address', label: 'Address', type: 'text', placeholder: 'e.g. Tuguegarao City, Cagayan', required: false, full: true },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-card-surface border border-custom rounded-2xl shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-custom">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-accent/10 border border-accent/30 flex items-center justify-center">
              <User className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h2 className="font-display font-semibold text-base">{isEdit ? 'Edit Person' : 'Add New Person'}</h2>
              <p className="text-xs text-muted-custom font-mono">{isEdit ? `Editing ID #${person.id}` : 'Fill in the details below'}</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg border border-custom hover:bg-muted-surface flex items-center justify-center transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {fields.map((field) => (
              <div key={field.key} className={field.full ? 'col-span-2' : 'col-span-1'}>
                <label className="block text-xs font-mono text-muted-custom uppercase tracking-wide mb-1.5">
                  {field.label} {field.required && <span className="text-red-400">*</span>}
                </label>
                <input
                  type={field.type}
                  required={field.required}
                  placeholder={field.placeholder}
                  value={form[field.key as keyof typeof form]}
                  onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-muted-surface border border-custom text-sm placeholder:text-muted-custom focus:outline-none focus:border-accent transition-colors"
                />
              </div>
            ))}
          </div>

          {error && (
            <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-sm text-red-400">{error}</div>
          )}

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2.5 rounded-xl border border-custom text-sm font-medium hover:bg-muted-surface transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-accent text-white text-sm font-medium hover:opacity-90 transition-all disabled:opacity-50">
              <Save className="w-4 h-4" />
              {loading ? 'Saving...' : isEdit ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
