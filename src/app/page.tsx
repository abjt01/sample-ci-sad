import Link from "next/link";
import { ArrowRight, Zap, Shield, GitBranch, BarChart3, Check } from "lucide-react";
import { WaitlistForm } from "@/components/waitlist-form";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: GitBranch,
    title: "Staged rollouts",
    description:
      "Roll out to 1%, 10%, 50% of users. Pause or revert instantly if metrics degrade.",
  },
  {
    icon: Shield,
    title: "Kill switches",
    description:
      "One click to disable any feature globally. No deploy required, no on-call panic.",
  },
  {
    icon: Zap,
    title: "Edge-fast evaluation",
    description:
      "Flag evaluation at the CDN edge — sub-millisecond latency, zero cold starts.",
  },
  {
    icon: BarChart3,
    title: "Built-in analytics",
    description:
      "Track exposure, conversion, and error rates per flag variant automatically.",
  },
];

const tiers = [
  {
    name: "Starter",
    price: "$0",
    period: "forever",
    description: "For indie hackers and small side projects.",
    features: [
      "Up to 5 feature flags",
      "1 environment",
      "10k evaluations / month",
      "Community support",
    ],
    cta: "Start free",
    href: "/dashboard",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "per month",
    description: "For growing teams who ship frequently.",
    features: [
      "Unlimited flags",
      "5 environments",
      "10M evaluations / month",
      "Percentage rollouts",
      "Slack alerts",
      "Priority support",
    ],
    cta: "Start 14-day trial",
    href: "/dashboard",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "contact us",
    description: "For orgs that need compliance and SLAs.",
    features: [
      "Everything in Pro",
      "SSO / SAML",
      "Audit logs",
      "Custom contracts",
      "Dedicated Slack channel",
      "99.99% SLA",
    ],
    cta: "Talk to us",
    href: "mailto:sales@lunn.dev",
    highlighted: false,
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-xl font-bold tracking-tight text-gray-900">
            lunn
          </span>
          <nav className="hidden md:flex items-center gap-8 text-sm text-gray-600">
            <Link href="#features" className="hover:text-gray-900 transition-colors">
              Features
            </Link>
            <Link href="#pricing" className="hover:text-gray-900 transition-colors">
              Pricing
            </Link>
            <Link href="/dashboard" className="hover:text-gray-900 transition-colors">
              Docs
            </Link>
          </nav>
          <Link
            href="/dashboard"
            className="text-sm font-medium bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Get started
          </Link>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="max-w-6xl mx-auto px-6 pt-24 pb-20 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-100 text-brand-700 text-xs font-medium mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
            Now in public beta
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-gray-900 text-balance mb-6">
            Ship without fear.
            <br />
            <span className="text-brand-600">Roll back in seconds.</span>
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10 text-balance">
            Lunn gives your team a single place to manage feature flags, staged rollouts,
            and environment configs — without touching your deploy pipeline.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-700 transition-colors"
            >
              Start for free
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="#pricing"
              className="inline-flex items-center gap-2 border border-gray-200 text-gray-700 px-6 py-3 rounded-xl font-medium hover:border-gray-400 transition-colors"
            >
              See pricing
            </Link>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Everything your team needs
            </h2>
            <p className="text-gray-500 text-lg">
              Built for engineering teams that ship multiple times a day.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="p-6 rounded-2xl border border-gray-100 bg-gray-50 hover:border-gray-200 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center mb-4">
                  <f.icon className="w-5 h-5 text-brand-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="bg-gray-50 py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-14">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                Simple, honest pricing
              </h2>
              <p className="text-gray-500 text-lg">
                No seats, no surprises. Pay for what you use.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {tiers.map((tier) => (
                <div
                  key={tier.name}
                  className={cn(
                    "rounded-2xl p-8 flex flex-col",
                    tier.highlighted
                      ? "bg-gray-900 text-white shadow-xl scale-105"
                      : "bg-white border border-gray-200"
                  )}
                >
                  <div className="mb-6">
                    <p className={cn("text-sm font-medium mb-1", tier.highlighted ? "text-gray-400" : "text-gray-500")}>
                      {tier.name}
                    </p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold">{tier.price}</span>
                      <span className={cn("text-sm", tier.highlighted ? "text-gray-400" : "text-gray-500")}>
                        / {tier.period}
                      </span>
                    </div>
                    <p className={cn("text-sm mt-2", tier.highlighted ? "text-gray-400" : "text-gray-500")}>
                      {tier.description}
                    </p>
                  </div>
                  <ul className="space-y-3 mb-8 flex-1">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm">
                        <Check className={cn("w-4 h-4 flex-shrink-0", tier.highlighted ? "text-brand-400" : "text-brand-600")} />
                        <span className={tier.highlighted ? "text-gray-300" : "text-gray-600"}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={tier.href}
                    className={cn(
                      "text-center py-3 rounded-xl font-medium text-sm transition-colors",
                      tier.highlighted
                        ? "bg-white text-gray-900 hover:bg-gray-100"
                        : "bg-gray-900 text-white hover:bg-gray-700"
                    )}
                  >
                    {tier.cta}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Waitlist */}
        <section className="max-w-2xl mx-auto px-6 py-24 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Get early access
          </h2>
          <p className="text-gray-500 mb-8">
            Join 2,400+ engineers already on the waitlist.
          </p>
          <WaitlistForm />
        </section>
      </main>

      <footer className="border-t border-gray-100 py-8 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Lunn Technologies Inc. All rights reserved.
      </footer>
    </div>
  );
}
