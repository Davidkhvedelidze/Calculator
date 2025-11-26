import type { PropsWithChildren, ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

interface DashboardShellProps extends PropsWithChildren {
  headerSlot?: ReactNode;
}

export function DashboardShell({ headerSlot, children }: DashboardShellProps) {
  return (
    <div className="container space-y-6 py-10">
      {headerSlot}
      <div className="grid gap-6 lg:grid-cols-[260px,1fr]">
        <Sidebar />
        <div className="space-y-6">
          <Topbar />
          {children}
        </div>
      </div>
    </div>
  );
}
