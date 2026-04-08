import { Terminal, Settings, CheckCircle, Download, FileCode, Plug, AlertCircle } from 'lucide-react';

export default function McpSetupPage() {
  const steps = [
    {
      step: '01',
      title: 'Install Claude Desktop',
      desc: 'Download and install Claude Desktop from the official Anthropic website.',
      code: 'https://claude.ai/download',
      isLink: true,
    },
    {
      step: '02',
      title: 'Clone the MCP Server Repository',
      desc: 'Clone the Person CRUD MCP server to your local machine.',
      code: 'git clone https://github.com/Pearlshaline/person_mcp_server.git\ncd person_mcp_server\nnpm install',
      isLink: false,
    },
    {
      step: '03',
      title: 'Configure Environment Variables',
      desc: 'Create a .env file in the MCP server folder with your database connection.',
      code: 'DATABASE_URL=postgresql://neondb_owner:YOUR_PASSWORD@ep-your-project-pooler.c-6.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require\nDIRECT_URL=postgresql://neondb_owner:YOUR_PASSWORD@ep-your-project.c-6.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
      isLink: false,
    },
    {
      step: '04',
      title: 'Build the MCP Server',
      desc: 'Compile the TypeScript MCP server to JavaScript.',
      code: 'npm run build',
      isLink: false,
    },
    {
      step: '05',
      title: 'Configure Claude Desktop',
      desc: 'Open your Claude Desktop config file and add the MCP server. Config location:',
      configPath: {
        windows: '%APPDATA%\\Claude\\claude_desktop_config.json',
        mac: '~/Library/Application Support/Claude/claude_desktop_config.json',
      },
      code: `{
  "mcpServers": {
    "person-crud": {
      "command": "node",
      "args": ["C:/path/to/person-mcp-server/dist/index.js"],
      "env": {
        "DATABASE_URL": "your-pooled-connection-string",
        "DIRECT_URL": "your-direct-connection-string"
      }
    }
  }
}`,
      isLink: false,
    },
    {
      step: '06',
      title: 'Restart Claude Desktop',
      desc: 'Fully quit and reopen Claude Desktop. You should see the MCP tools available.',
      code: '# Look for the hammer icon in Claude Desktop\n# This confirms MCP tools are loaded',
      isLink: false,
    },
  ];

  const tools = [
    { name: 'list_persons', desc: 'Get all persons from the database', method: 'READ' },
    { name: 'get_person', desc: 'Get a single person by ID', method: 'READ' },
    { name: 'create_person', desc: 'Create a new person record', method: 'CREATE' },
    { name: 'update_person', desc: 'Update an existing person by ID', method: 'UPDATE' },
    { name: 'delete_person', desc: 'Delete a person record by ID', method: 'DELETE' },
    { name: 'search_persons', desc: 'Search persons by name or email', method: 'READ' },
  ];

  const methodColors: Record<string, string> = {
    READ: 'text-blue-400 bg-blue-400/10 border-blue-400/30',
    CREATE: 'text-green-400 bg-green-400/10 border-green-400/30',
    UPDATE: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30',
    DELETE: 'text-red-400 bg-red-400/10 border-red-400/30',
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="mb-10">
        <h1 className="font-display text-4xl font-bold mb-3">MCP Server Setup</h1>
        <p className="text-muted-custom leading-relaxed">
          Step-by-step guide to connect the Person CRUD MCP server to Claude Desktop,
          enabling AI-powered database operations through natural language.
        </p>
      </div>

      {/* What is MCP */}
      <div className="p-6 rounded-2xl bg-accent/5 border border-accent/20 mb-8">
        <h2 className="font-display text-xl font-semibold mb-3 flex items-center gap-2">
          What is MCP?
        </h2>
        <p className="text-sm text-muted-custom leading-relaxed mb-3">
          Model Context Protocol (MCP) is an open standard
          that allows AI models like Claude to connect to external tools and data sources. This MCP server
          exposes Person CRUD operations as tools that Claude Desktop can call directly.
        </p>
        <p className="text-sm text-muted-custom leading-relaxed">
          Once configured, you can ask Claude things like "List all persons",{' '}
          "Create a person named John Doe", or{' '}
          "Delete person with ID 1" and Claude will
          execute the database operations automatically.
        </p>
      </div>

      {/* Available MCP Tools */}
      <div className="mb-8">
        <h2 className="font-display text-xl font-semibold mb-5">
          Available MCP Tools
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {tools.map(({ name, desc, method }) => (
            <div key={name} className="flex gap-3 p-4 rounded-xl border">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <code className="text-xs font-mono font-bold">{name}</code>
                  <span className="text-xs font-mono px-1.5 py-0.5 rounded border">
                    {method}
                  </span>
                </div>
                <p className="text-xs">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Setup Steps */}
      <div className="mb-8">
        <h2 className="font-display text-xl font-semibold mb-5">
          Setup Steps
        </h2>
        <div className="space-y-4">
          {steps.map((item) => (
            <div key={item.step} className="flex gap-4 p-5 rounded-2xl border">
              <span className="font-mono text-2xl font-bold flex-shrink-0">{item.step}</span>
              <div className="flex-1 min-w-0">
                <h3 className="font-display font-semibold mb-1">{item.title}</h3>
                <p className="text-sm leading-relaxed mb-3">{item.desc}</p>
                {'configPath' in item && item.configPath && (
                  <div className="mb-3 space-y-1">
                    <p className="text-xs font-mono">
                      Windows: {item.configPath.windows}
                    </p>
                    <p className="text-xs font-mono">
                      Mac: {item.configPath.mac}
                    </p>
                  </div>
                )}
                {item.isLink ? (
                  <a
                    href={item.code}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono underline underline-offset-2 hover:opacity-80"
                  >
                    {item.code}
                  </a>
                ) : (
                  <pre className="p-3 rounded-xl border text-xs font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap break-all">
                    {item.code}
                  </pre>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Verify it works */}
      <div className="p-6 rounded-2xl border mb-8">
        <h2 className="font-display text-xl font-semibold mb-4">
          Verify It Works
        </h2>
        <p className="text-sm mb-4">
          After restarting Claude Desktop, test the MCP connection by typing these prompts:
        </p>
        <div className="space-y-4">
          {[
            'List all persons in the database',
            'Create a new person named John Doe with the email john.doe@email.com, age 25, phone number +63 946 882 2314, and address Ilagan City, Isabela',
            'Get person with ID 2',
            "Update person 2's age to 36",
            'Search for persons named Ana Reyes',
            'Delete person with ID 1',
          ].map((prompt, i) => (
            <div key={i} className="rounded-xl border overflow-hidden">
              <div className="flex items-start gap-3 p-3">
                <span className="w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <code className="text-xs font-mono">{prompt}</code>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Troubleshooting */}
      <div className="p-6 rounded-2xl bg-card-surface border border-custom mb-8">
        <h2 className="font-display text-xl font-semibold mb-4 flex items-center gap-2">
          Troubleshooting
        </h2>
        <div className="space-y-3">
          {[
            { problem: 'MCP tools not showing in Claude Desktop', fix: 'Make sure you fully quit (not just close) and reopen Claude Desktop after editing the config file.' },
            { problem: 'Database connection error', fix: 'Double-check your DATABASE_URL and DIRECT_URL in the MCP server .env file. Make sure the Neon database is active.' },
            { problem: 'Command not found: node', fix: 'Install Node.js from nodejs.org. Make sure the path in claude_desktop_config.json points to the built dist/index.js file.' },
            { problem: 'Config file not found', fix: 'Create the file manually at the path shown above. Make sure the JSON is valid with no trailing commas.' },
          ].map(({ problem, fix }) => (
            <div key={problem} className="p-3 rounded-xl bg-card-surface border border-custom">
              <p className="text-sm font-medium text-white-400 mb-1"> {problem}</p>
              <p className="text-xs text-muted-custom">{fix}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
