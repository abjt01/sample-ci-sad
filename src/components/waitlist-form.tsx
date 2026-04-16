"use client";

import { useState } from "react";
import { ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

type State = "idle" | "loading" | "success" | "error";

export function WaitlistForm() {
  const [email, setEmail]   = useState("");
  const [state, setState]   = useState<State>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    setState("loading");
    setMessage("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json();

      if (!res.ok) {
        setState("error");
        setMessage(data.error ?? "Something went wrong. Try again.");
        return;
      }

      setState("success");
      setMessage(
        data.alreadyRegistered
          ? `You're already on the list at position #${data.position}.`
          : `You're on the list at position #${data.position}. We'll be in touch soon.`
      );
    } catch {
      setState("error");
      setMessage("Network error. Please try again.");
    }
  }

  if (state === "success") {
    return (
      <div className="flex flex-col items-center gap-3 animate-fade-in">
        <CheckCircle2 className="w-8 h-8 text-green-500" />
        <p className="text-gray-700 font-medium">{message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@company.com"
        required
        disabled={state === "loading"}
        className={cn(
          "flex-1 px-4 py-3 rounded-xl border text-sm outline-none transition-colors",
          "border-gray-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-100",
          "disabled:opacity-50 disabled:cursor-not-allowed"
        )}
      />
      <button
        type="submit"
        disabled={state === "loading" || !email.trim()}
        className={cn(
          "inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl",
          "bg-gray-900 text-white text-sm font-medium transition-colors",
          "hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
        )}
      >
        {state === "loading" ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <>
            Join waitlist
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>
      {state === "error" && (
        <p className="text-red-500 text-sm w-full text-center">{message}</p>
      )}
    </form>
  );
}
