import { Layers, Database, Cpu, Globe, GitBranch, Zap } from 'lucide-react';

export default function AboutPage() {
  const stack = [
    { icon: Globe, name: 'Next.js 15', desc: 'React framework with App Router for server-side rendering and API routes', color: 'text-blue-400' },
    { icon: Database, name: 'PostgreSQL + Prisma', desc: 'Relational database with Prisma ORM for type-safe database queries', color: 'text-green-400' },
    { icon: Layers, name: 'Tailwind CSS', desc: 'Utility-first CSS framework for rapid, responsive UI development', color: 'text-cyan-400' },
    { icon: Cpu, name: 'TypeScript', desc: 'Typed JavaScript for improved developer experience and code reliability', color: 'text-yellow-400' },
    { icon: Zap, name: 'Vercel', desc: 'Cloud deployment platform with automatic CI/CD and global CDN', color: 'text-purple-400' },
    { icon: GitBranch, name: 'GitHub', desc: 'Version control and source code management for the project', color: 'text-orange-400' },
  ];

  const architecture = [
    { step: '01', title: 'Client Layer', desc: 'React components using Next.js App Router. All interactive UI built with client components ("use client"). Forms, modals, and CRUD operations handled in the browser.' },
    { step: '02', title: 'API Layer', desc: 'Next.js API Routes at /api/persons handle all HTTP methods: GET (list/read), POST (create), PUT (update), DELETE (remove). RESTful design with proper status codes.' },
    { step: '03', title: 'ORM Layer', desc: 'Prisma Client provides type-safe database access. A singleton instance is shared across API routes to prevent connection pool exhaustion in development.' },
    { step: '04', title: 'Database Layer', desc: 'PostgreSQL hosted on Neon (serverless) stores all Person records. Prisma Migrate handles schema changes and version control of the database structure.' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="mb-10">
        <p className="text-xs font-mono text-accent uppercase tracking-widest mb-1">Documentation</p>
        <h1 className="font-display text-4xl font-bold mb-3">About This App</h1>
        <p className="text-muted-custom leading-relaxed">
          A full-stack Person Management application built with modern web technologies,
          demonstrating complete CRUD operations, database integration, and professional UI/UX design.
        </p>
      </div>

      {/* Overview */}
      <div className="p-6 rounded-2xl bg-card-surface border border-custom mb-8">
        <h2 className="font-display text-xl font-semibold mb-3">App Overview</h2>
        <p className="text-sm text-muted-custom leading-relaxed mb-4">
          This Person App is a production-grade full-stack web application developed as part of a university
          coursework deliverable. It implements the complete CRUD lifecycle — Create, Read, Update, and Delete —
          for Person records, backed by a real PostgreSQL database.
        </p>
        <p className="text-sm text-muted-custom leading-relaxed">
          Built by <span className="text-accent font-medium">Pearlshaline Gumiran</span>, 3rd Year BSIT Student
          at St. Paul University Philippines.
        </p>
      </div>

      {/* Architecture */}
      <div className="mb-8">
        <h2 className="font-display text-xl font-semibold mb-5">App Architecture</h2>
        <div className="space-y-4">
          {architecture.map((item) => (
            <div key={item.step} className="flex gap-4 p-5 rounded-2xl bg-card-surface border border-custom">
              <span className="font-mono text-2xl font-bold text-accent/30 flex-shrink-0">{item.step}</span>
              <div>
                <h3 className="font-display font-semibold mb-1">{item.title}</h3>
                <p className="text-sm text-muted-custom leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Stack */}
      <div className="mb-8">
        <h2 className="font-display text-xl font-semibold mb-5">Technology Stack</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {stack.map(({ icon: Icon, name, desc, color }) => (
            <div key={name} className="flex gap-3 p-4 rounded-xl bg-card-surface border border-custom card-hover">
              <Icon className={`w-5 h-5 ${color} flex-shrink-0 mt-0.5`} />
              <div>
                <p className="font-medium text-sm">{name}</p>
                <p className="text-xs text-muted-custom mt-0.5 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CRUD Features */}
      <div className="p-6 rounded-2xl bg-accent/5 border border-accent/20">
        <h2 className="font-display text-xl font-semibold mb-4">CRUD Features</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { op: 'CREATE', desc: 'Add new person via modal form with validation', method: 'POST /api/persons' },
            { op: 'READ', desc: 'List all persons with search/filter functionality', method: 'GET /api/persons' },
            { op: 'UPDATE', desc: 'Edit existing person via pre-filled modal form', method: 'PUT /api/persons/:id' },
            { op: 'DELETE', desc: 'Remove person with confirmation dialog', method: 'DELETE /api/persons/:id' },
          ].map(({ op, desc, method }) => (
            <div key={op} className="p-3 rounded-xl bg-card-surface border border-custom">
              <span className="text-xs font-mono text-accent font-bold">{op}</span>
              <p className="text-sm mt-1 mb-1">{desc}</p>
              <code className="text-xs font-mono text-muted-custom">{method}</code>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
