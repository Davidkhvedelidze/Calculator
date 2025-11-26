"use client";

import { useState, FormEvent } from "react";
import { httpRequest } from "@/src/lib/services/http";
import { Button } from "@/components/ui/Button";

interface UploadResult {
  fileName: string;
  url: string;
}

export function UploadPanel() {
  const [status, setStatus] = useState<"idle" | "uploading" | "error" | "success">("idle");
  const [error, setError] = useState<string>("");
  const [result, setResult] = useState<UploadResult | null>(null);

  const handleUpload = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("uploading");
    setError("");
    const formData = new FormData(event.currentTarget);

    try {
      const response = await httpRequest<UploadResult, FormData>("/api/uploads", {
        method: "POST",
        body: formData,
      });
      setResult(response.data);
      setStatus("success");
    } catch (uploadError) {
      setError("Upload failed. Please try again.");
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleUpload} className="space-y-3">
      <input
        name="file"
        type="file"
        required
        className="w-full rounded-xl border border-border-subtle bg-white/80 px-4 py-3 text-sm text-text-primary outline-none transition file:mr-4 file:rounded-lg file:border-0 file:bg-brand-600 file:px-4 file:py-2 file:font-semibold file:text-white"
      />
      <Button type="submit" variant="secondary" fullWidth disabled={status === "uploading"}>
        {status === "uploading" ? "Uploading..." : "Upload attachment"}
      </Button>
      {result && (
        <p className="text-sm text-text-secondary">
          Stored as <span className="font-semibold text-text-primary">{result.fileName}</span>
        </p>
      )}
      {status === "error" && <p className="text-sm text-red-600">{error}</p>}
    </form>
  );
}
