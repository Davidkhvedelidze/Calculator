"use client";

import clsx from "clsx";
import { motion } from "framer-motion";
import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  icon?: ReactNode;
  fullWidth?: boolean;
}

export function Button({ variant = "primary", icon, fullWidth, className, children, ...props }: ButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className={clsx(
        "inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
        {
          "bg-brand-600 text-white shadow-strong hover:bg-brand-700 focus-visible:outline-brand-500": variant === "primary",
          "border border-border-subtle text-text-primary hover:bg-brand-50 focus-visible:outline-brand-500": variant === "secondary",
          "text-text-secondary hover:text-text-primary": variant === "ghost",
          "w-full": fullWidth,
        },
        className
      )}
      {...props}
    >
      {icon}
      {children}
    </motion.button>
  );
}
