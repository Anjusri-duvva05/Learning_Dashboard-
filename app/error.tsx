"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-6 rounded-2xl border border-border bg-surface p-10 text-center shadow-card">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-danger/10">
          <AlertTriangle className="h-8 w-8 text-danger" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-textPrimary">
            Something went wrong
          </h2>
          <p className="max-w-sm text-sm text-textSecondary">
            {error.message?.includes("supabase") || error.message?.includes("fetch")
              ? "Unable to connect to the database. Please check your Supabase configuration."
              : "An unexpected error occurred while loading your dashboard."}
          </p>
        </div>
        <button
          onClick={reset}
          className="flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-medium text-white transition-all hover:bg-accentGlow hover:shadow-glow-sm"
        >
          <RefreshCcw className="h-4 w-4" />
          Try Again
        </button>
      </div>
    </div>
  );
}
