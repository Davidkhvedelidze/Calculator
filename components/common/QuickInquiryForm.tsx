"use client";

import { useState, FormEvent } from "react";
import { submitInquiry } from "@/app/actions/submitInquiry";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export function QuickInquiryForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setErrors([]);
    const formData = new FormData(event.currentTarget);
    const result = await submitInquiry(formData);

    if (!result.success) {
      setErrors(result.errors ?? ["Unable to submit inquiry."]);
      setStatus("error");
      return;
    }

    setStatus("success");
    event.currentTarget.reset();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-3 md:grid-cols-2">
        <Input name="name" label="Guest name" required placeholder="Nino K." />
        <Input name="email" label="Email" type="email" required placeholder="nino@example.com" />
      </div>
      <Input name="travelDates" label="Travel window" placeholder="10–20 September" />
      <Input name="groupSize" label="Group size" type="number" min={1} placeholder="2" />
      <label className="flex flex-col gap-2 text-sm font-medium text-[var(--text-primary)]">
        Preferences
        <textarea
          name="preferences"
          className="min-h-[120px] rounded-xl border border-border-subtle bg-white/80 px-4 py-3 text-sm text-text-primary outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200 dark:bg-surface-muted"
          placeholder="Boutique hotels, wine tastings, light hikes"
          required
        />
      </label>
      {errors.length > 0 && (
        <ul className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
      <Button type="submit" variant="primary" fullWidth disabled={status === "submitting"}>
        {status === "submitting" ? "Submitting..." : "Save inquiry"}
      </Button>
      {status === "success" && <p className="text-sm text-brand-700">Inquiry captured. We will respond within one business day.</p>}
    </form>
  );
}
