'use client';

import { useForm, ValidationError } from '@formspree/react';
import Link from 'next/link';

export default function SignupPage() {
  const [state, handleSubmit] = useForm('mdaznael');

  if (state.succeeded) {
    return (
      <div className="min-h-screen bg-white font-sans flex flex-col">
        <header className="h-24 w-full">
          <nav className="container--boxed flex items-center justify-between h-full">
            <Link href="/" className="text-3xl font-semibold">
              Flipry{' '}
              <span className="text-sm text-zinc-500">Beta</span>
            </Link>
          </nav>
        </header>

        <main className="flex-1 flex items-center justify-center px-6">
          <div className="max-w-md w-full text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-zinc-900 mb-4">
              Thank you!
            </h1>
            <p className="text-lg text-zinc-600 mb-8">
              Flipry is currently in beta and our team will email you with access to the platform.
            </p>
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              ← Back to home
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col">
      <header className="h-24 w-full">
        <nav className="container--boxed flex items-center justify-between h-full">
          <Link href="/" className="text-3xl font-semibold">
            Flipry{' '}
            <span className="text-sm text-zinc-500">Beta</span>
          </Link>
        </nav>
      </header>

      <main className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-zinc-900 mb-4">
              Get early access
            </h1>
            <p className="text-lg text-zinc-600">
              Sign up for early access and enjoy free Flipbook creation during our beta.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-zinc-700 mb-2"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                required
                placeholder="you@example.com"
                className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              />
              <ValidationError
                prefix="Email"
                field="email"
                errors={state.errors}
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <button
              type="submit"
              disabled={state.submitting}
              className="w-full bg-zinc-900 text-white py-3 px-4 rounded-lg font-medium hover:bg-zinc-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {state.submitting ? 'Submitting...' : 'Join the beta'}
            </button>
          </form>

          <p className="text-center text-sm text-zinc-500 mt-6">
            We respect your privacy. No spam, ever.
          </p>
        </div>
      </main>
    </div>
  );
}
