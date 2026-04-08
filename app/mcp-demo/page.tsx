'use client';

import { useState } from 'react';
import { Play, Terminal, CheckCircle, XCircle, Loader2, Bot, Database, Zap } from 'lucide-react';

interface ResultState {
  status: 'idle' | 'loading' | 'success' | 'error';
  data: any;
  tool: string;
  prompt: string;
}

export default function McpDemoPage() {
  const [result, setResult] = useState<ResultState>({ status: 'idle', data: null, tool: '', prompt: '' });

  const demoScenarios = [
    {
      label: 'List All Persons',
      tool: 'list_persons',
      prompt: 'List all persons in the database',
      description: 'Fetches all person records via MCP',
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10 border-blue-400/30',
    },
    {
      label: 'Create Person',
      tool: 'create_person',
      prompt: 'Create a person: firstName=Demo, lastName=User, email=demo@mcp.test',
      description: 'Creates a new person via MCP tool',
      color: 'text-green-400',
      bgColor: 'bg-green-400/10 border-green-400/30',
    },
    {
      label: 'Search Persons',
      tool: 'search_persons',
      prompt: 'Search for persons with name containing "Pearl"',
      description: 'Searches persons by name or email',
      color: 'text-purple-400',
      bgColor: 'bg-purple-400/10 border-purple-400/30',
    },
    {
      label: 'Get Person by ID',
      tool: 'get_person',
      prompt: 'Get person with ID 1',
      description: 'Retrieves a specific person record',
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-400/10 border-yellow-400/30',
    },
    {
      label: 'Update Person',
      tool: 'update_person',
      prompt: 'Update person ID 1: set phone to +639123456789',
      description: 'Updates an existing person record',
      color: 'text-orange-400',
      bgColor: 'bg-orange-400/10 border-orange-400/30',
    },
    {
      label: 'Delete Person',
      tool: 'delete_person',
      prompt: 'Delete person with ID 999',
      description: 'Removes a person from the database',
      color: 'text-red-400',
      bgColor: 'bg-red-400/10 border-red-400/30',
    },
  ];

  async function runDemo(scenario: typeof demoScenarios[0]) {
    setResult({ status: 'loading', data: null, tool: scenario.tool, prompt: scenario.prompt });

    // Simulate calling the actual API to demonstrate MCP-like behavior
    try {
      let data;
      if (scenario.tool === 'list_persons' || scenario.tool === 'search_persons') {
        const res = await fetch('/api/persons');
        data = await res.json();
      } else if (scenario.tool === 'get_person') {
        const res = await fetch('/api/persons');
        const all = await res.json();
        data = Array.isArray(all) && all.length > 0 ? all[0] : { message: 'No persons found' };
      } else if (scenario.tool === 'create_person') {
        const res = await fetch('/api/persons', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            firstName: 'Demo',
            lastName: 'User',
            email: `demo.mcp.${Date.now()}@test.com`,
          }),
        });
        data = await res.json();
      } else if (scenario.tool === 'update_person') {
        const listRes = await fetch('/api/persons');
        const all = await listRes.json();
        if (Array.isArray(all) && all.length > 0) {
          const res = await fetch(`/api/persons/${all[0].id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              firstName: all[0].firstName,
              lastName: all[0].lastName,
              email: all[0].email,
              phone: '+639123456789',
            }),
          });
          data = await res.json();
        } else {
          data = { message: 'No persons available to update' };
        }
      } else if (scenario.tool === 'delete_person') {
        data = { message: 'Delete operation simulated — no actual record deleted in demo mode' };
      }

      setResult({ status: 'success', data, tool: scenario.tool, prompt: scenario.prompt });
    } catch {
      setResult({ status: 'error', data: { error: 'Failed to execute operation' }, tool: scenario.tool, prompt: scenario.prompt });
    }
  }

  const exampleConversations = [
    {
      user: 'List all persons in the database',
      claude: 'I\'ll use the list_persons MCP tool to fetch all records.',
      tool: 'list_persons()',
      result: '[{ id: 1, firstName: "Maria", lastName: "Santos", email: "maria.santos@email.com", ... }]',
    },
    {
      user: 'Add a new person: John Doe, john@example.com, age 25, phone number +63 946 882 2314, and address Ilagan City, Isabela',
      claude: 'Creating a new person record using the create_person MCP tool.',
      tool: 'create_person({ firstName: "John", lastName: "Doe", email: "john@example.com", age: 25, phone: "+63 946 882 2314", address: "Ilagan City, Isabela" })',
      result: '{ id: 6, firstName: "John", lastName: "Doe", email: "john@example.com", age: 25, phone: "+63 946 882 2314", address: "Ilagan City, Isabela", createdAt: "..." }',
    },
    {
      user: 'Delete the person with ID 1',
      claude: 'I\'ll remove that record using the delete_person MCP tool.',
      tool: 'delete_person({ id: 1 })',
      result: '{ message: "Person deleted successfully" }',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="mb-10">
        <h1 className="font-display text-4xl font-bold mb-3">MCP Demo</h1>
        <p className="text-muted-custom leading-relaxed">
          Live demonstration of MCP server CRUD operations. Each button below simulates
          what Claude Desktop does when you ask it to manage Person records via MCP tools.
        </p>
      </div>

      {/* How it works */}
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Claude Desktop', desc: 'You type a natural language request' },
          { label: 'MCP Protocol', desc: 'Claude calls the right MCP tool' },
          { label: 'Neon Database', desc: 'Operation executes on real data' },
        ].map(({ label, desc }) => (
          <div key={label} className="p-4 rounded-xl border text-center">
            <p className="font-medium text-sm">{label}</p>
            <p className="text-xs mt-1">{desc}</p>
          </div>
        ))}
      </div>


      {/* Live Demo Buttons */}
      <div className="mb-8">
        <h2 className="font-display text-xl font-semibold mb-5 flex items-center gap-2">
           Live CRUD Demo
        </h2>
        <p className="text-sm text-muted-custom mb-4">
          Click any operation below to run it against the real database — just like the MCP server does.
        </p>
        <div className="grid sm:grid-cols-2 gap-3 mb-6">
          {demoScenarios.map((scenario) => (
            <button
              key={scenario.tool}
              onClick={() => runDemo(scenario)}
              disabled={result.status === 'loading'}
              className={`text-left p-4 rounded-xl border transition-all hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed ${
                result.tool === scenario.tool && result.status !== 'idle'
                  ? scenario.bgColor
                  : 'bg-card-surface border-custom hover:border-accent/50'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`text-sm font-medium ${scenario.color}`}>{scenario.label}</span>
                {result.tool === scenario.tool && result.status === 'loading' && (
                  <Loader2 className="w-4 h-4 animate-spin text-accent" />
                )}
                {result.tool === scenario.tool && result.status === 'success' && (
                  <CheckCircle className="w-4 h-4 text-green-400" />
                )}
                {result.tool === scenario.tool && result.status === 'error' && (
                  <XCircle className="w-4 h-4 text-red-400" />
                )}
              </div>
              <code className="text-xs font-mono text-muted-custom">{scenario.tool}()</code>
              <p className="text-xs text-muted-custom mt-1">{scenario.description}</p>
            </button>
          ))}
        </div>

        {/* Result Display */}
        {result.status !== 'idle' && (
          <div className="p-5 rounded-2xl bg-card-surface border border-custom">
            <div className="flex items-center gap-2 mb-3">
              <Terminal className="w-4 h-4 text-accent" />
              <span className="text-sm font-mono text-accent font-bold">MCP Tool Execution</span>
              {result.status === 'loading' && <Loader2 className="w-4 h-4 animate-spin text-accent ml-auto" />}
              {result.status === 'success' && <CheckCircle className="w-4 h-4 text-green-400 ml-auto" />}
              {result.status === 'error' && <XCircle className="w-4 h-4 text-red-400 ml-auto" />}
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-xs font-mono text-muted-custom mb-1">PROMPT:</p>
                <p className="text-sm text-accent/80 italic">"{result.prompt}"</p>
              </div>
              <div>
                <p className="text-xs font-mono text-muted-custom mb-1">TOOL CALLED:</p>
                <code className="text-xs font-mono text-purple-400">{result.tool}()</code>
              </div>
              <div>
                <p className="text-xs font-mono text-muted-custom mb-1">RESULT:</p>
                {result.status === 'loading' ? (
                  <p className="text-xs text-muted-custom animate-pulse">Executing...</p>
                ) : (
                  <pre className="p-3 rounded-xl bg-[rgb(var(--bg-muted))] border border-custom text-xs font-mono text-green-400 overflow-x-auto whitespace-pre-wrap break-all">
                    {JSON.stringify(result.data, null, 2)}
                  </pre>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Example Claude Desktop Conversations */}
      <div className="mb-8">
        <h2 className="font-display text-xl font-semibold mb-5 flex items-center gap-2">
          Example Claude Desktop Conversations
        </h2>
        <div className="space-y-4">
          {exampleConversations.map((conv, i) => (
            <div key={i} className="p-5 rounded-2xl bg-card-surface border border-custom">
              <div className="space-y-3">
                <div className="flex gap-3">
                  <span className="text-xs font-mono px-2 py-1 rounded  border border-gray-400/30 flex-shrink-0 h-fit">USER</span>
                  <p className="text-sm">{conv.user}</p>
                </div>
                <div className="flex gap-3">
                  <span className="text-xs font-mono px-2 py-1 rounded  border border-gray-400/30 flex-shrink-0 h-fit">CLAUDE</span>
                  <p className="text-sm text-muted-custom">{conv.claude}</p>
                </div>
                <div className="flex gap-3">
                  <span className="text-xs font-mono px-2 py-1 rounded border-gray-400/30 border flex-shrink-0 h-fit">TOOL</span>
                  <code className="text-xs font-mono text-white-300">{conv.tool}</code>
                </div>
                <div className="flex gap-3">
                  <span className="text-xs font-mono px-2 py-1 rounded  border border-gray-400/30flex-shrink-0 h-fit">RESULT</span>
                  <code className="text-xs font-mono text-white-300">{conv.result}</code>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="p-6 rounded-2xl bg-accent/5 border border-accent/20 text-center">
        <h2 className="font-display text-xl font-semibold mb-2">Ready to Try It Yourself?</h2>
        <p className="text-sm text-muted-custom mb-4">
          Follow the setup guide to connect this MCP server to your own Claude Desktop.
        </p>
        <a
          href="/mcp-setup"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-accent text-white text-sm font-medium hover:opacity-90 transition-all"
        >
          View Setup Guide →
        </a>
      </div>
    </div>
  );
}
