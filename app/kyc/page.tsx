"use client";

import { useState } from "react";

export default function KYCPage() {
  const [loading, setLoading] = useState(false);

  async function startVerification() {
    try {
      setLoading(true);

      const response = await fetch("/api/didit/session", {
        method: "POST",
      });

      const data = await response.json();

      if (!response.ok || !data.url) {
        throw new Error(data?.error || data?.details || "Could not create Didit session");
      }

      window.location.href = data.url;
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : "Unable to start verification. Please try again.");
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 py-10">
      <div className="mx-auto max-w-xl">

        <div className="text-4xl font-bold mb-16">
          Arc<span className="text-blue-500">Pay</span>
        </div>

        <h1 className="text-5xl font-bold leading-tight">
          Verify your
          <br />
          identity
        </h1>

        <p className="mt-8 text-xl leading-8 text-gray-400">
          Verify your identity securely with ArcPay.
          You will be redirected to our secure verification
          partner to complete the process.
        </p>

        <button
          type="button"
          onClick={startVerification}
          disabled={loading}
          className="mt-14 w-full rounded-2xl bg-white px-8 py-6 text-xl font-bold text-black disabled:opacity-50"
        >
          {loading ? "Starting verification..." : "Start Verification"}
        </button>

        <div className="mt-10 rounded-2xl border border-blue-500/20 bg-blue-500/5 p-7 text-gray-400 leading-7">
          Your identity verification is securely processed
          through Didit.
        </div>

      </div>
    </main>
  );
}
