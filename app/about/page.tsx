export default function AboutPage() {
  const stack = [
    { name: 'Next.js 15', desc: 'React framework with App Router for server-side rendering and API routes' },
    { name: 'PostgreSQL + Prisma', desc: 'Relational database with Prisma ORM for type-safe database queries' },
    { name: 'Tailwind CSS', desc: 'Utility-first CSS framework for rapid, responsive UI development' },
    { name: 'TypeScript', desc: 'Typed JavaScript for improved developer experience and code reliability' },
    { name: 'Vercel', desc: 'Cloud deployment platform with automatic CI/CD and global CDN' },
    { name: 'GitHub', desc: 'Version control and source code management for the project' },
    { name: 'MCP Protocol', desc: 'Model Context Protocol enabling Claude Desktop to perform CRUD operations via AI tools' },
    { name: 'Claude Desktop', desc: 'Anthropic\'s AI assistant that connects to the MCP server to manage Person data' },
  ];

  const architecture = [
    { step: '01', title: 'Client Layer', desc: 'React components using Next.js App Router. All interactive UI built with client components ("use client"). Forms, modals, and CRUD operations handled in the browser.' },
    { step: '02', title: 'API Layer', desc: 'Next.js API Routes at /api/persons handle all HTTP methods: GET (list/read), POST (create), PUT (update), DELETE (remove). RESTful design with proper status codes.' },
    { step: '03', title: 'ORM Layer', desc: 'Prisma Client provides type-safe database access. A singleton instance is shared across API routes to prevent connection pool exhaustion in development.' },
    { step: '04', title: 'Database Layer', desc: 'PostgreSQL hosted on Neon (serverless) stores all Person records. Prisma Migrate handles schema changes and version control of the database structure.' },
    { step: '05', title: 'MCP Server Layer', desc: 'A standalone Node.js MCP server exposes Person CRUD operations as tools. Claude Desktop connects to this server via the Model Context Protocol, enabling AI-powered database management.' },
  ];

  const mcpFlow = [
    { from: 'You (User)', to: 'Claude Desktop', action: 'Type natural language prompt' },
    { from: 'Claude Desktop', to: 'MCP Server', action: 'Calls the matching MCP tool' },
    { from: 'MCP Server', to: 'Neon Database', action: 'Executes Prisma query' },
    { from: 'Neon Database', to: 'Claude Desktop', action: 'Returns result data' },
    { from: 'Claude Desktop', to: 'You (User)', action: 'Presents the result in chat' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="mb-10">
        <h1 className="font-display text-4xl font-bold mb-3">About Person Search</h1>
        <p className="text-muted-custom leading-relaxed">
          Person Search is a full-stack application with MCP integration, enabling AI-powered
          database operations through Claude Desktop alongside traditional CRUD functionality.
        </p>
      </div>

      {/* Overview */}
      <div className="p-6 rounded-2xl bg-card-surface border border-custom mb-8">
        <h2 className="font-display text-xl font-semibold mb-3">App Overview</h2>
        <p className="text-sm text-muted-custom leading-relaxed mb-4">
          Person Search is a production-grade full-stack web application developed as part of a university
          coursework project. It supports the complete CRUD lifecycle — Create, Read, Update, Delete — 
          for Person records, backed by a PostgreSQL database. Later, it was enhanced with an
          <span className=" font-medium"> MCP (Model Context Protocol) server</span> allowing
          Claude Desktop to manage Person data using natural language.
        </p>
        <p className="text-sm text-muted-custom leading-relaxed">
          Built by <span className="font-medium">Pearlshaline Gumiran</span>, 3rd Year BSIT Student
          at St. Paul University Philippines.
        </p>
      </div>

      {/* MCP Integration */}
      <div className="mb-8">
        <h2 className="font-display text-xl font-semibold mb-3">MCP Integration Architecture</h2>
        <p className="text-sm text-muted-custom mb-5 leading-relaxed">
          The MCP server bridges Claude Desktop and the Person database. When you ask Claude to manage persons, it calls MCP tools which perform real database operations.
        </p>
        <div className="p-5 rounded-2xl bg-accent/5 border border-accent/20 mb-4">
          <div className="space-y-3">
            {mcpFlow.map(({ from, to, action }, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-xs font-mono font-bold w-32 flex-shrink-0">{from}</span>
                <span className="text-xs font-mono text-muted-custom flex-1">{action}</span>
                <span className="text-xs font-mono font-bold w-32 flex-shrink-0 text-right">{to}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { label: 'MCP Tools', value: '6 tools', sub: 'list, get, create, update, delete, search' },
            { label: 'Protocol', value: 'MCP v1', sub: 'Model Context Protocol by Anthropic' },
            { label: 'AI Client', value: 'Claude Desktop', sub: 'Connects via stdio transport' },
            { label: 'Data Access', value: 'Prisma ORM', sub: 'Type-safe PostgreSQL queries' },
          ].map(({ label, value, sub }) => (
            <div key={label} className="p-4 rounded-xl bg-card-surface border border-custom">
              <p className="text-xs font-mono text-muted-custom uppercase tracking-wide mb-1">{label}</p>
              <p className="font-display font-semibold ">{value}</p>
              <p className="text-xs text-muted-custom font-mono">{sub}</p>
            </div>
          ))}
        </div>
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
          {stack.map(({ name, desc }) => (
            <div key={name} className="p-4 rounded-xl bg-card-surface border border-custom card-hover">
              <p className="font-medium text-sm">{name}</p>
              <p className="text-xs text-muted-custom mt-0.5 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CRUD Features */}
      <div className="p-6 rounded-2xl bg-accent/5 border border-accent/20">
        <h2 className="font-display text-xl font-semibold mb-4">CRUD Features</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { op: 'CREATE', desc: 'Add new person via modal form or MCP tool', method: 'POST /api/persons' },
            { op: 'READ', desc: 'List all persons with search/filter functionality', method: 'GET /api/persons' },
            { op: 'UPDATE', desc: 'Edit existing person via form or MCP tool', method: 'PUT /api/persons/:id' },
            { op: 'DELETE', desc: 'Remove person with confirmation or via MCP', method: 'DELETE /api/persons/:id' },
          ].map(({ op, desc, method }) => (
            <div key={op} className="p-3 rounded-xl bg-card-surface border border-custom">
              <span className="text-xs font-mono font-bold">{op}</span>
              <p className="text-sm mt-1 mb-1">{desc}</p>
              <code className="text-xs font-mono text-muted-custom">{method}</code>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}