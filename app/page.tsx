"use client";

import Link from "next/link";
import { useState } from "react";

const features = [
  {
    title: "Get Started",
    text: "Create your ArcPay account and start using the platform.",
  },
  {
    title: "Didit KYC",
    text: "Complete secure identity verification with Didit.",
  },
  {
    title: "KYC Status",
    text: "Check your verification status quickly and securely.",
  },
  {
    title: "Arc Wallet",
    text: "Manage your digital wallet and payment activity.",
  },
  {
    title: "USDC Payments",
    text: "Send and receive USDC payments through ArcPay.",
  },
  {
    title: "Public Deployment",
    text: "Deploy your ArcPay application and make it available online.",
  },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-black text-white">
      <nav className="border-b border-white/10 bg-black/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div className="text-2xl font-bold tracking-tight">
            Arc<span className="text-blue-500">Pay</span>
          </div>

          <div className="hidden items-center gap-8 md:flex">
            <a
              href="#features"
              className="text-sm text-gray-300 hover:text-white"
            >
              Features
            </a>

            <a
              href="#security"
              className="text-sm text-gray-300 hover:text-white"
            >
              Security
            </a>

            <a
              href="#about"
              className="text-sm text-gray-300 hover:text-white"
            >
              About
            </a>

            <Link
              href="/account"
              className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black hover:bg-gray-200"
            >
              Get Started
            </Link>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-lg border border-white/10 px-3 py-2 md:hidden"
          >
            Menu
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-white/10 px-6 py-4 md:hidden">
            <div className="flex flex-col gap-4">
              <a href="#features">Features</a>
              <a href="#security">Security</a>
              <a href="#about">About</a>

              <Link
                href="/account"
                className="rounded-full bg-white px-5 py-3 text-center font-semibold text-black"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </nav>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.22),_transparent_45%)]" />

        <div className="relative mx-auto max-w-6xl px-6 pb-24 pt-28 text-center md:pt-36">
          <div className="mx-auto mb-6 inline-flex rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm text-blue-300">
            Secure digital payments
          </div>

          <h1 className="mx-auto max-w-4xl text-5xl font-bold tracking-tight md:text-7xl">
            Simple payments.
            <br />
            <span className="text-blue-500">Built for the future.</span>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-gray-400">
            ArcPay brings identity verification, digital wallets and USDC
            payments together in one simple and secure platform.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/account"
              className="rounded-full bg-white px-8 py-4 font-semibold text-black hover:bg-gray-200"
            >
              Get Started
            </Link>

            <button className="rounded-full border border-white/20 px-8 py-4 font-semibold text-white hover:bg-white/10">
              Explore Features
            </button>
          </div>

          <div className="mx-auto mt-20 grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <div className="text-2xl font-bold">KYC</div>
              <div className="mt-2 text-sm text-gray-500">Verification</div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <div className="text-2xl font-bold">USDC</div>
              <div className="mt-2 text-sm text-gray-500">Payments</div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <div className="text-2xl font-bold">Wallet</div>
              <div className="mt-2 text-sm text-gray-500">Management</div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <div className="text-2xl font-bold">Secure</div>
              <div className="mt-2 text-sm text-gray-500">Infrastructure</div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-500">
              Features
            </p>

            <h2 className="mt-4 text-4xl font-bold md:text-5xl">
              Everything you need in one place.
            </h2>

            <p className="mt-5 text-gray-400">
              ArcPay is designed to make digital payments and identity
              verification simple for everyone.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 transition hover:border-blue-500/40 hover:bg-white/[0.05]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 font-bold text-blue-400">
                  0{index + 1}
                </div>

                <h3 className="mt-6 text-xl font-semibold">
                  {feature.title}
                </h3>

                <p className="mt-3 leading-7 text-gray-400">
                  {feature.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="security" className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="rounded-3xl border border-blue-500/20 bg-blue-500/[0.06] p-8 md:p-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
              Security
            </p>

            <h2 className="mt-4 max-w-3xl text-4xl font-bold">
              Security first. Payments made simple.
            </h2>

            <p className="mt-5 max-w-2xl leading-8 text-gray-400">
              ArcPay is built around secure identity verification and a clean
              payment experience. Your financial journey should be simple,
              transparent and protected.
            </p>
          </div>
        </div>
      </section>

      <section id="about" className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-24 text-center">
          <h2 className="text-4xl font-bold md:text-5xl">
            Ready to use ArcPay?
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-gray-400">
            Start building your secure payment experience today.
          </p>

          <Link
            href="/account"
            className="mt-8 inline-block rounded-full bg-white px-8 py-4 font-semibold text-black hover:bg-gray-200"
          >
            Create Account
          </Link>
        </div>
      </section>

      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 text-sm text-gray-500 md:flex-row md:items-center md:justify-between">
          <div>© 2026 ArcPay. All rights reserved.</div>
          <div>Secure digital payments</div>
        </div>
      </footer>
    </main>
  );
}
