import { Github, ExternalLink, GitBranch, Star, Code2, BookOpen } from 'lucide-react';

export default function GithubPage() {
  const repos = [
    {
      name: 'person-app',
      desc: 'Full-stack Person CRUD application built with Next.js 15, Prisma, and PostgreSQL.',
      url: 'https://github.com/Pearlshaline/person-app',
      tags: ['Next.js', 'Prisma', 'PostgreSQL', 'TypeScript'],
      primary: true,
    },
    {
      name: 'Lab_HandsOn',
      desc: 'Mini Twitter — a social media website where users can post tweets, follow others, and like posts.',
      url: 'https://github.com/Pearlshaline/Lab_HandsOn',
      tags: ['Laravel', 'MySQL', 'Tailwind CSS'],
      primary: false,
    },
    {
      name: 'activity',
      desc: 'Movies — a movie browsing website where users can explore films, add to watchlist, and rate movies.',
      url: 'https://github.com/Pearlshaline/activity',
      tags: ['Laravel', 'MySQL', 'HTML'],
      primary: false,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="mb-10">
        <p className="text-xs font-mono text-accent uppercase tracking-widest mb-1">Documentation</p>
        <h1 className="font-display text-4xl font-bold mb-3">GitHub Repository</h1>
        <p className="text-muted-custom leading-relaxed">
          All source code for this project is publicly available on GitHub.
          Click the link below to view the repository.
        </p>
      </div>

      {/* Primary repo highlight */}
      <div className="p-6 rounded-2xl bg-accent/5 border border-accent/30 mb-8">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center">
              <Github className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-xs font-mono text-accent uppercase tracking-wide mb-0.5">Primary Repository</p>
              <h2 className="font-display font-semibold text-lg">person-app</h2>
            </div>
          </div>
          <a
            href="https://github.com/Pearlshaline/person-app"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-accent text-white text-sm font-medium hover:opacity-90 transition-all flex-shrink-0"
          >
            <Github className="w-4 h-4" />
            View on GitHub
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
        <p className="text-sm text-muted-custom mb-4 leading-relaxed">
          Full-stack Person CRUD application built with Next.js 15, Prisma ORM, and PostgreSQL.
          Features complete Create, Read, Update, and Delete operations with a responsive, modern UI.
        </p>
        <div className="flex flex-wrap gap-2">
          {['Next.js 15', 'TypeScript', 'Prisma', 'PostgreSQL', 'Tailwind CSS', 'Vercel'].map((tag) => (
            <span key={tag} className="text-xs font-mono px-2.5 py-1 rounded-lg bg-card-surface border border-custom text-muted-custom">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* GitHub profile */}
      <div className="p-6 rounded-2xl bg-card-surface border border-custom mb-8">
        <h2 className="font-display text-xl font-semibold mb-4 flex items-center gap-2">
          <Code2 className="w-5 h-5 text-accent" /> GitHub Profile
        </h2>
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-medium">Pearlshaline Gumiran</p>
            <p className="text-sm text-muted-custom font-mono">@Pearlshaline</p>
            <p className="text-sm text-muted-custom mt-1">
              3rd Year BSIT Student · St. Paul University Philippines
            </p>
          </div>
          <a
            href="https://github.com/Pearlshaline"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-custom bg-muted-surface text-sm hover:border-accent hover:text-accent transition-all flex-shrink-0"
          >
            <Github className="w-4 h-4" />
            @Pearlshaline
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* All repos */}
      <div className="mb-8">
        <h2 className="font-display text-xl font-semibold mb-5 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-accent" /> All Repositories
        </h2>
        <div className="space-y-4">
          {repos.map((repo) => (
            <div key={repo.name} className="p-5 rounded-2xl bg-card-surface border border-custom card-hover">
              <div className="flex items-start justify-between gap-4 mb-2">
                <div className="flex items-center gap-2">
                  <GitBranch className="w-4 h-4 text-accent flex-shrink-0" />
                  <h3 className="font-display font-semibold text-sm">{repo.name}</h3>
                  {repo.primary && (
                    <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-accent/10 border border-accent/30 text-accent">
                      This App
                    </span>
                  )}
                </div>
                <a
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-mono text-muted-custom hover:text-accent transition-colors flex-shrink-0"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  View
                </a>
              </div>
              <p className="text-sm text-muted-custom mb-3 leading-relaxed">{repo.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {repo.tags.map((tag) => (
                  <span key={tag} className="text-xs font-mono px-2 py-0.5 rounded bg-muted-surface border border-custom text-muted-custom">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Setup instructions */}
      <div className="p-6 rounded-2xl bg-card-surface border border-custom">
        <h2 className="font-display text-xl font-semibold mb-4">How to Run Locally</h2>
        <div className="space-y-3">
          {[
            { step: '1', cmd: 'git clone https://github.com/Pearlshaline/person-app.git', desc: 'Clone the repository' },
            { step: '2', cmd: 'cd person-app && npm install', desc: 'Install dependencies' },
            { step: '3', cmd: 'cp .env.example .env  # Add your DATABASE_URL', desc: 'Set up environment variables' },
            { step: '4', cmd: 'npx prisma migrate dev && npx prisma db seed', desc: 'Set up database and seed data' },
            { step: '5', cmd: 'npm run dev', desc: 'Start the development server at localhost:3000' },
          ].map(({ step, cmd, desc }) => (
            <div key={step} className="flex gap-3 p-3 rounded-xl bg-muted-surface border border-custom">
              <span className="w-5 h-5 rounded-full bg-accent/20 text-accent text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                {step}
              </span>
              <div>
                <code className="text-xs font-mono text-accent block mb-0.5">{cmd}</code>
                <p className="text-xs text-muted-custom">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
