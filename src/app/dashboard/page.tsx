import type { Metadata } from "next";
import Link from "next/link";
import { GitBranch, Activity, ToggleLeft, AlertCircle, ArrowUpRight } from "lucide-react";
import { getFlagStats } from "@/lib/flags";
import { formatNumber } from "@/lib/format";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const stats = await getFlagStats();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="text-xl font-bold tracking-tight text-gray-900">
              lunn
            </Link>
            <nav className="flex items-center gap-1 text-sm">
              <span className="px-3 py-1.5 rounded-lg bg-gray-100 text-gray-900 font-medium">
                Flags
              </span>
              <Link href="/dashboard" className="px-3 py-1.5 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors">
                Environments
              </Link>
              <Link href="/dashboard" className="px-3 py-1.5 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors">
                Analytics
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">Production</span>
            <div className="w-2 h-2 rounded-full bg-green-500" />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Feature Flags</h1>
          <p className="text-gray-500 text-sm mt-1">
            {stats.total} flags across {stats.environments} environments
          </p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            { label: "Active flags",     value: formatNumber(stats.active),      icon: ToggleLeft,  color: "text-green-600"  },
            { label: "Evaluations today", value: formatNumber(stats.evaluations), icon: Activity,    color: "text-blue-600"   },
            { label: "Open rollouts",     value: stats.rollouts.toString(),       icon: GitBranch,   color: "text-purple-600" },
            { label: "Alerts",            value: stats.alerts.toString(),         icon: AlertCircle, color: "text-red-500"    },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-500">{stat.label}</span>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
              <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
            </div>
          ))}
        </div>

        {/* Flag list */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">All flags</h2>
            <button className="text-sm font-medium bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
              New flag
            </button>
          </div>
          <div className="divide-y divide-gray-100">
            {stats.flags.map((flag) => (
              <div key={flag.key} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-6 rounded-full flex items-center transition-colors ${flag.enabled ? "bg-green-500" : "bg-gray-200"}`}>
                    <div className={`w-4 h-4 bg-white rounded-full shadow-sm mx-1 transition-transform ${flag.enabled ? "translate-x-4" : ""}`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 font-mono">{flag.key}</p>
                    <p className="text-xs text-gray-500">{flag.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 text-sm text-gray-500">
                  <span>{formatNumber(flag.evaluations)} / day</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    flag.rollout === 100
                      ? "bg-green-50 text-green-700"
                      : flag.rollout === 0
                      ? "bg-gray-100 text-gray-500"
                      : "bg-yellow-50 text-yellow-700"
                  }`}>
                    {flag.rollout}%
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-gray-300" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
