"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function AccountPage() {
  const supabase = createClient();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function createAccount() {
    if (!name || !email || !password) {
      setMessage("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
        },
      });

      if (error) {
        setMessage(error.message);
        return;
      }

      if (data.session) {
        window.location.href = "/kyc";
      } else {
        setMessage(
          "Account created. Please check your email to confirm your account."
        );
      }
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <div className="mx-auto max-w-md">

        <Link
          href="/"
          className="text-sm text-gray-400 hover:text-white"
        >
          ← Back to ArcPay
        </Link>

        <div className="mt-12">
          <div className="text-3xl font-bold">
            Arc<span className="text-blue-500">Pay</span>
          </div>

          <h1 className="mt-8 text-4xl font-bold">
            Create your account
          </h1>

          <p className="mt-3 leading-7 text-gray-400">
            Create your ArcPay account to continue to identity verification
            and payments.
          </p>
        </div>

        <div className="mt-10 space-y-5">

          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Full name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-4 text-white outline-none placeholder:text-gray-600 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Email address
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-4 text-white outline-none placeholder:text-gray-600 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-4 text-white outline-none placeholder:text-gray-600 focus:border-blue-500"
            />
          </div>

          <button
            type="button"
            onClick={createAccount}
            disabled={loading}
            className="w-full rounded-xl bg-white px-6 py-4 text-center font-semibold text-black transition hover:bg-gray-200 disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>

          {message && (
            <div className="rounded-xl border border-white/10 bg-white/[0.05] p-4 text-sm leading-6 text-gray-300">
              {message}
            </div>
          )}

        </div>

        <div className="mt-8 rounded-2xl border border-blue-500/20 bg-blue-500/[0.06] p-5">
          <p className="text-sm leading-6 text-gray-400">
            Your account information will be used to continue with secure
            identity verification.
          </p>
        </div>

      </div>
    </main>
  );
}
