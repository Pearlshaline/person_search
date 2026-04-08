'use client';

import { useState, useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun, Menu, X, Users, LogIn, LogOut, UserPlus, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/github', label: 'GitHub' },
  { href: '/mcp-setup', label: 'MCP Setup' },
  { href: '/mcp-demo', label: 'MCP Demo' },
];

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function getInitials(name?: string | null) {
    if (!name) return '?';
    return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
  }

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
            Person<span className="text-accent">.</span>search
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

          {/* Auth buttons */}
          {status === 'loading' ? (
            <div className="w-8 h-8 rounded-full bg-muted-surface animate-pulse" />
          ) : session ? (
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-custom bg-card-surface hover:bg-muted-surface transition-all"
              >
                <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center text-white text-xs font-bold">
                  {session.user?.image ? (
                    <img src={session.user.image} alt="" className="w-6 h-6 rounded-full" />
                  ) : (
                    getInitials(session.user?.name)
                  )}
                </div>
                <span className="text-sm font-medium hidden sm:block max-w-[100px] truncate">
                  {session.user?.name || session.user?.email}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-muted-custom" />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 rounded-xl bg-card-surface border border-custom shadow-xl overflow-hidden z-50">
                  <div className="px-4 py-3 border-b border-custom">
                    <p className="text-sm font-medium truncate">{session.user?.name}</p>
                    <p className="text-xs text-muted-custom truncate">{session.user?.email}</p>
                  </div>
                  <button
                    onClick={() => { signOut({ callbackUrl: '/signin' }); setUserMenuOpen(false); }}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-400 hover:bg-muted-surface transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Link
                href="/signin"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-custom bg-card-surface hover:bg-muted-surface text-sm transition-all"
              >
                <LogIn className="w-3.5 h-3.5" />
                Sign In
              </Link>
              <Link
                href="/signup"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-accent text-white text-sm font-medium hover:opacity-90 transition-all"
              >
                <UserPlus className="w-3.5 h-3.5" />
                Sign Up
              </Link>
            </div>
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
          <div className="border-t border-custom mt-2 pt-2 flex flex-col gap-1">
            {session ? (
              <button
                onClick={() => signOut({ callbackUrl: '/signin' })}
                className="py-2.5 px-3 text-sm text-red-400 hover:bg-muted-surface rounded-md text-left flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
            ) : (
              <>
                <Link href="/signin" onClick={() => setMobileOpen(false)} className="py-2.5 px-3 text-sm text-muted-custom hover:text-accent hover:bg-muted-surface rounded-md flex items-center gap-2">
                  <LogIn className="w-4 h-4" /> Sign In
                </Link>
                <Link href="/signup" onClick={() => setMobileOpen(false)} className="py-2.5 px-3 text-sm text-accent hover:bg-muted-surface rounded-md flex items-center gap-2">
                  <UserPlus className="w-4 h-4" /> Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
