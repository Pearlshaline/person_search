'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun, Menu, X, Users } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'Persons' },
  { href: '/about', label: 'About' },
  { href: '/database', label: 'Database' },
  { href: '/github', label: 'GitHub' },
  { href: '/mcp-setup', label: 'MCP Setup' },
  { href: '/mcp-demo', label: 'MCP Demo' },
];

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-[rgb(var(--bg))]/90 backdrop-blur-xl border-b border-custom shadow-lg' : 'bg-[rgb(var(--bg))]/80 backdrop-blur-sm border-b border-custom'
    }`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center group-hover:scale-110 transition-transform">
            <Users className="w-4 h-4 text-white" />
          </div>
          <span className="font-display font-semibold text-sm tracking-wide hidden sm:block">
            Person<span className="text-accent">.</span>app
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                pathname === link.href
                  ? 'text-accent bg-muted-surface font-medium'
                  : 'text-muted-custom hover:text-accent hover:bg-muted-surface'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="w-9 h-9 rounded-lg border border-custom bg-card-surface hover:bg-muted-surface flex items-center justify-center transition-all hover:border-accent hover:text-accent"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          )}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-9 h-9 rounded-lg border border-custom bg-card-surface flex items-center justify-center"
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-custom bg-[rgb(var(--bg))]/95 backdrop-blur-xl px-6 py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`py-2.5 px-3 text-sm rounded-md transition-colors ${
                pathname === link.href ? 'text-accent bg-muted-surface' : 'text-muted-custom hover:text-accent hover:bg-muted-surface'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
