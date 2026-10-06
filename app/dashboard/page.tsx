export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-8 text-white">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between">
          <div className="text-3xl font-bold">
            Arc<span className="text-blue-500">Pay</span>
          </div>

          <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300">
            Verified
          </div>
        </div>

        <div className="mt-16">
          <p className="text-gray-400">Welcome to ArcPay</p>
          <h1 className="mt-2 text-4xl font-bold">
            Your Dashboard
          </h1>
        </div>

        <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.04] p-7">
          <p className="text-sm text-gray-400">Available Balance</p>
          <div className="mt-3 text-4xl font-bold">
            $0.00
          </div>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-gray-400">Payments</p>
            <p className="mt-3 text-2xl font-bold">0</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-gray-400">Transactions</p>
            <p className="mt-3 text-2xl font-bold">0</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-gray-400">KYC Status</p>
            <p className="mt-3 text-2xl font-bold text-green-400">
              Verified
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
