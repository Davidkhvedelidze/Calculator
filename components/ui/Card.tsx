import { motion } from "framer-motion";
import type { PropsWithChildren, ReactNode } from "react";

interface CardProps extends PropsWithChildren {
  title?: string;
  action?: ReactNode;
  className?: string;
  subdued?: boolean;
}

export function Card({ title, action, className, subdued, children }: CardProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.24, ease: "easeOut" }}
      className={`card ${subdued ? "bg-[var(--bg-muted)]" : ""} ${className ?? ""}`}
    >
      {(title || action) && (
        <header className="mb-4 flex items-center justify-between gap-3">
          {title && <h3 className="text-lg font-semibold text-[var(--text-primary)]">{title}</h3>}
          {action}
        </header>
      )}
      {children}
    </motion.section>
  );
}
