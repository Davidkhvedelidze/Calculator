import clsx from "clsx";
import { forwardRef, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function InputField({ label, helperText, className, ...props }, ref) {
  return (
    <label className="flex w-full flex-col gap-2 text-sm font-medium text-[var(--text-primary)]">
      {label}
      <input
        ref={ref}
        className={clsx(
          "w-full rounded-xl border px-4 py-3 text-sm text-text-primary outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200 dark:bg-surface-muted",
          className
        )}
        {...props}
      />
      {helperText && <span className="text-xs text-text-secondary">{helperText}</span>}
    </label>
  );
});
