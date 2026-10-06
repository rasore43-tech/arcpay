"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function AccountPage() {
  const supabase = createClient();

  const [mode, setMode] = useState<"signup" | "login">("signup");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit() {
    if (!email || !password || (mode === "signup" && !name)) {
      setMessage("Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      if (mode === "signup") {
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
          setMessage("Account created successfully.");
          setMode("login");
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          setMessage(error.message);
          return;
        }

        if (data.session) {
          window.location.href = "/kyc";
        }
      }
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function continueWithGoogle() {
    try {
      setLoading(true);
      setMessage("");

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/kyc`,
        },
      });

      if (error) {
        setMessage(error.message);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setMessage("Google sign in failed.");
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <div className="mx-auto flex min-h-[90vh] max-w-md flex-col justify-center">

        {/* Logo */}
        <div className="mb-10 text-center">
          <Link href="/" className="text-3xl font-bold">
            Arc<span className="text-blue-500">Pay</span>
          </Link>

          <h1 className="mt-8 text-3xl font-bold">
            {mode === "signup" ? "Create your account" : "Welcome back"}
          </h1>

          <p className="mt-3 text-gray-400">
            {mode === "signup"
              ? "Create an ArcPay account to get started."
              : "Sign in to continue to ArcPay."}
          </p>
        </div>

        {/* Create Account / Sign In switch */}
        <div className="mb-6 flex rounded-xl border border-gray-800 bg-gray-950 p-1">
          <button
            onClick={() => {
              setMode("signup");
              setMessage("");
            }}
            className={`flex-1 rounded-lg py-3 font-semibold ${
              mode === "signup"
                ? "bg-white text-black"
                : "text-gray-400"
            }`}
          >
            Create Account
          </button>

          <button
            onClick={() => {
              setMode("login");
              setMessage("");
            }}
            className={`flex-1 rounded-lg py-3 font-semibold ${
              mode === "login"
                ? "bg-white text-black"
                : "text-gray-400"
            }`}
          >
            Sign In
          </button>
        </div>

        {/* Google */}
        <button
          onClick={continueWithGoogle}
          disabled={loading}
          className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-700 bg-white py-4 font-semibold text-black transition hover:bg-gray-200 disabled:opacity-50"
        >
          <span className="text-lg font-bold">G</span>
          Continue with Google
        </button>

        {/* Divider */}
        <div className="my-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-gray-800" />
          <span className="text-sm text-gray-500">or</span>
          <div className="h-px flex-1 bg-gray-800" />
        </div>

        {/* Name */}
        {mode === "signup" && (
          <div className="mb-4">
            <label className="mb-2 block text-sm text-gray-300">
              Full Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full rounded-xl border border-gray-800 bg-gray-950 px-4 py-4 text-white outline-none focus:border-blue-500"
            />
          </div>
        )}

        {/* Email */}
        <div className="mb-4">
          <label className="mb-2 block text-sm text-gray-300">
            Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-xl border border-gray-800 bg-gray-950 px-4 py-4 text-white outline-none focus:border-blue-500"
          />
        </div>

        {/* Password */}
        <div className="mb-5">
          <label className="mb-2 block text-sm text-gray-300">
            Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full rounded-xl border border-gray-800 bg-gray-950 px-4 py-4 text-white outline-none focus:border-blue-500"
          />
        </div>

        {/* Error / success */}
        {message && (
          <div className="mb-5 rounded-xl border border-gray-800 bg-gray-950 p-4 text-center text-sm text-gray-300">
            {message}
          </div>
        )}

        {/* Main button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full rounded-xl bg-blue-600 py-4 font-bold text-white transition hover:bg-blue-500 disabled:opacity-50"
        >
          {loading
            ? "Please wait..."
            : mode === "signup"
            ? "Create Account"
            : "Sign In"}
        </button>

        {/* Switch text */}
        <p className="mt-6 text-center text-sm text-gray-400">
          {mode === "signup" ? (
            <>
              Already have an account?{" "}
              <button
                onClick={() => {
                  setMode("login");
                  setMessage("");
                }}
                className="font-semibold text-blue-500"
              >
                Sign In
              </button>
            </>
          ) : (
            <>
              Don't have an account?{" "}
              <button
                onClick={() => {
                  setMode("signup");
                  setMessage("");
                }}
                className="font-semibold text-blue-500"
              >
                Create Account
              </button>
            </>
          )}
        </p>

        <Link
          href="/"
          className="mt-8 text-center text-sm text-gray-500 hover:text-white"
        >
          ← Back to home
        </Link>
      </div>
    </main>
  );
}
