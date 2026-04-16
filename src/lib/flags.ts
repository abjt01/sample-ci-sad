/**
 * Feature flag data layer.
 * In production this would query a database or an edge KV store.
 * For the demo it returns static seed data — the shape is what matters.
 */

export interface Flag {
  key: string;
  description: string;
  enabled: boolean;
  rollout: number;       // 0–100 percentage
  evaluations: number;   // evaluations in last 24h
  createdAt: string;
}

export interface FlagStats {
  total: number;
  active: number;
  evaluations: number;
  rollouts: number;      // flags with 0 < rollout < 100
  alerts: number;
  environments: number;
  flags: Flag[];
}

const SEED_FLAGS: Flag[] = [
  {
    key: "new-dashboard-v2",
    description: "Redesigned dashboard with recharts and new nav layout",
    enabled: true,
    rollout: 25,
    evaluations: 48_200,
    createdAt: "2025-03-01",
  },
  {
    key: "stripe-checkout-v3",
    description: "Upgraded Stripe checkout with Link and Apple Pay support",
    enabled: true,
    rollout: 100,
    evaluations: 12_400,
    createdAt: "2025-02-14",
  },
  {
    key: "ai-autocomplete",
    description: "GPT-powered autocomplete in the flag description editor",
    enabled: false,
    rollout: 0,
    evaluations: 0,
    createdAt: "2025-03-10",
  },
  {
    key: "edge-evaluation",
    description: "Evaluate flags at edge runtime instead of origin server",
    enabled: true,
    rollout: 10,
    evaluations: 203_000,
    createdAt: "2025-01-20",
  },
  {
    key: "team-audit-log",
    description: "Per-team audit trail for all flag changes",
    enabled: true,
    rollout: 100,
    evaluations: 3_100,
    createdAt: "2025-02-28",
  },
];

export async function getFlagStats(): Promise<FlagStats> {
  const active     = SEED_FLAGS.filter((f) => f.enabled).length;
  const evaluations = SEED_FLAGS.reduce((sum, f) => sum + f.evaluations, 0);
  const rollouts   = SEED_FLAGS.filter((f) => f.rollout > 0 && f.rollout < 100).length;

  return {
    total: SEED_FLAGS.length,
    active,
    evaluations,
    rollouts,
    alerts: 0,
    environments: 3,
    flags: SEED_FLAGS,
  };
}

export async function getFlag(key: string): Promise<Flag | null> {
  return SEED_FLAGS.find((f) => f.key === key) ?? null;
}
