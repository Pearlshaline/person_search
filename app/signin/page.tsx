'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Users, Mail, Lock, Eye, EyeOff, Github, Chrome, LogIn } from 'lucide-react';

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError('Invalid email or password');
      setLoading(false);
    } else {
      router.push('/');
      router.refresh();
    }
  }

  async function handleOAuth(provider: 'google' | 'github') {
    setLoading(true);
    await signIn(provider, { callbackUrl: '/' });
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center mb-4">
            <Users className="w-6 h-6 text-white" />
          </div>
          <h1 className="font-display text-2xl font-bold">Welcome back</h1>
          <p className="text-sm text-muted-custom mt-1">Sign in to your Person App account</p>
        </div>

        {/* Card */}
        <div className="p-6 rounded-2xl bg-card-surface border border-custom">

          {/* OAuth Buttons */}
          <div className="space-y-3 mb-6">
            <button
              onClick={() => handleOAuth('google')}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 px-4 py-2.5 rounded-xl border border-custom bg-muted-surface hover:bg-card-surface hover:border-accent/50 transition-all text-sm font-medium disabled:opacity-50"
            >
              <Chrome className="w-4 h-4 text-red-400" />
              Continue with Google
            </button>
            <button
              onClick={() => handleOAuth('github')}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 px-4 py-2.5 rounded-xl border border-custom bg-muted-surface hover:bg-card-surface hover:border-accent/50 transition-all text-sm font-medium disabled:opacity-50"
            >
              <Github className="w-4 h-4" />
              Continue with GitHub
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-[rgb(var(--border))]" />
            <span className="text-xs font-mono text-muted-custom">or</span>
            <div className="flex-1 h-px bg-[rgb(var(--border))]" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-sm text-red-400">
                ⚠️ {error}
              </div>
            )}

            <div>
              <label className="text-xs font-mono text-muted-custom uppercase tracking-wide block mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-custom" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder=""
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-muted-surface border border-custom text-sm placeholder:text-muted-custom focus:outline-none focus:border-accent transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-mono text-muted-custom uppercase tracking-wide block mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-custom" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder=""
                  required
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-muted-surface border border-custom text-sm placeholder:text-muted-custom focus:outline-none focus:border-accent transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-custom hover:text-accent transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-accent text-white text-sm font-medium hover:opacity-90 transition-all disabled:opacity-50"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <LogIn className="w-4 h-4" />
              )}
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-muted-custom mt-6">
          Don't have an account?{' '}
          <Link href="/signup" className="text-accent hover:underline font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
