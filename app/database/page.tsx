import { Database, Table, Key, Hash, Type, Calendar } from 'lucide-react';

export default function DatabasePage() {
  const fields = [
    { name: 'id', type: 'Int', constraint: '@id @default(autoincrement())', icon: Key, desc: 'Auto-incrementing primary key' },
    { name: 'firstName', type: 'String', constraint: 'required', icon: Type, desc: 'Person\'s first name' },
    { name: 'lastName', type: 'String', constraint: 'required', icon: Type, desc: 'Person\'s last name' },
    { name: 'email', type: 'String', constraint: '@unique', icon: Hash, desc: 'Unique email address identifier' },
    { name: 'phone', type: 'String?', constraint: 'optional', icon: Type, desc: 'Optional contact phone number' },
    { name: 'age', type: 'Int?', constraint: 'optional', icon: Type, desc: 'Optional age of the person' },
    { name: 'address', type: 'String?', constraint: 'optional', icon: Type, desc: 'Optional physical address' },
    { name: 'createdAt', type: 'DateTime', constraint: '@default(now())', icon: Calendar, desc: 'Timestamp when record was created' },
    { name: 'updatedAt', type: 'DateTime', constraint: '@updatedAt', icon: Calendar, desc: 'Timestamp of last update' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="mb-10">
        <p className="text-xs font-mono text-accent uppercase tracking-widest mb-1">Documentation</p>
        <h1 className="font-display text-4xl font-bold mb-3">Database Structure</h1>
        <p className="text-muted-custom leading-relaxed">
          This app uses <span className="text-accent font-medium">PostgreSQL</span> as the database,
          managed through <span className="text-accent font-medium">Prisma ORM</span> for type-safe queries and migrations.
        </p>
      </div>

      {/* Provider info */}
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Database', value: 'PostgreSQL', sub: 'Relational DB' },
          { label: 'ORM', value: 'Prisma', sub: 'v5.22.0' },
          { label: 'Hosting', value: 'Neon', sub: 'Serverless Postgres' },
        ].map(({ label, value, sub }) => (
          <div key={label} className="p-4 rounded-xl bg-card-surface border border-custom text-center">
            <p className="text-xs font-mono text-muted-custom uppercase tracking-wide mb-1">{label}</p>
            <p className="font-display font-semibold text-accent">{value}</p>
            <p className="text-xs text-muted-custom font-mono">{sub}</p>
          </div>
        ))}
      </div>

      {/* Schema */}
      <div className="mb-8">
        <h2 className="font-display text-xl font-semibold mb-4 flex items-center gap-2">
          <Database className="w-5 h-5 text-accent" /> Prisma Schema
        </h2>
        <pre className="p-5 rounded-2xl bg-[rgb(var(--bg-muted))] border border-custom text-xs font-mono leading-relaxed overflow-x-auto text-green-400">
{`// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Person {
  id        Int      @id @default(autoincrement())
  firstName String
  lastName  String
  email     String   @unique
  phone     String?
  age       Int?
  address   String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}`}
        </pre>
      </div>

      {/* Fields table */}
      <div className="mb-8">
        <h2 className="font-display text-xl font-semibold mb-4 flex items-center gap-2">
          <Table className="w-5 h-5 text-accent" /> Person Model Fields
        </h2>
        <div className="rounded-2xl bg-card-surface border border-custom overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-custom bg-muted-surface">
                {['Field', 'Type', 'Constraint', 'Description'].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-mono text-muted-custom uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {fields.map((field, i) => {
                const Icon = field.icon;
                return (
                  <tr key={field.name} className={`border-b border-custom hover:bg-muted-surface/50 transition-colors ${i === fields.length - 1 ? 'border-0' : ''}`}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Icon className="w-3.5 h-3.5 text-accent" />
                        <span className="text-sm font-mono font-medium">{field.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs font-mono px-2 py-1 rounded bg-muted-surface border border-custom text-blue-400">{field.type}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs font-mono text-purple-400">{field.constraint}</span>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-custom">{field.desc}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Migration commands */}
      <div className="p-6 rounded-2xl bg-card-surface border border-custom">
        <h2 className="font-display text-xl font-semibold mb-4">Migration Commands</h2>
        <div className="space-y-3">
          {[
            { cmd: 'npx prisma migrate dev --name init', desc: 'Create and apply the initial migration' },
            { cmd: 'npx prisma generate', desc: 'Generate the Prisma Client after schema changes' },
            { cmd: 'npx prisma db seed', desc: 'Populate the database with sample person data' },
            { cmd: 'npx prisma studio', desc: 'Open Prisma Studio to visually browse database records' },
          ].map(({ cmd, desc }) => (
            <div key={cmd} className="p-3 rounded-xl bg-muted-surface border border-custom">
              <code className="text-xs font-mono text-accent block mb-1">{cmd}</code>
              <p className="text-xs text-muted-custom">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
