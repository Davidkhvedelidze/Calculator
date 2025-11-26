import type { ColumnsType } from "antd/es/table";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { Card } from "@/components/ui/Card";
import { DataTable } from "@/components/ui/DataTable";
import { QuickInquiryForm } from "@/components/common/QuickInquiryForm";
import { UploadPanel } from "@/components/common/UploadPanel";
import { getDashboardSnapshot, listInquiries } from "@/src/lib/services/db";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [snapshot, inquiries] = await Promise.all([getDashboardSnapshot(), listInquiries(8)]);

  type InquiryRow = Awaited<ReturnType<typeof listInquiries>>[number];

  const columns: ColumnsType<InquiryRow> = [
    { title: "Guest", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Preferences", dataIndex: "preferences", key: "preferences", width: 320 },
    { title: "Dates", dataIndex: "travelDates", key: "travelDates" },
    { title: "Created", dataIndex: "createdAt", key: "createdAt" },
  ];

  return (
    <DashboardShell>
      <div className="grid gap-4 lg:grid-cols-3">
        <Card title="Inquiries" subdued>
          <p className="text-3xl font-semibold text-text-primary">{snapshot.totalInquiries}</p>
          <p className="text-sm text-text-secondary">Total captured via server actions</p>
        </Card>
        <Card title="Payments" subdued>
          <p className="text-3xl font-semibold text-text-primary">{snapshot.totalPayments}</p>
          <p className="text-sm text-text-secondary">Payment intents initialized via API</p>
        </Card>
        <Card title="Uploads" subdued>
          <p className="text-3xl font-semibold text-text-primary">{snapshot.totalUploads}</p>
          <p className="text-sm text-text-secondary">Files stored securely on the server</p>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
        <Card title="Latest inquiries">
          <DataTable columns={columns as any} data={inquiries} rowKey="id" emptyMessage="No inquiries yet." />
        </Card>
        <Card title="Capture an inquiry" action={<span className="text-xs text-text-secondary">Server action powered</span>}>
          <QuickInquiryForm />
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="Secure uploads" action={<span className="text-xs text-text-secondary">API route with storage</span>}>
          <UploadPanel />
        </Card>
        <Card title="Operational notes" subdued>
          <ul className="space-y-2 text-sm text-text-secondary">
            <li>• Session tokens are httpOnly and checked in middleware.</li>
            <li>• Payment intents are persisted server-side for auditability.</li>
            <li>• File uploads are sanitized and stored inside /public/uploads.</li>
          </ul>
        </Card>
      </div>
    </DashboardShell>
  );
}
