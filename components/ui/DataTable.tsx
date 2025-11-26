"use client";

import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";

export interface DataTableProps<T> {
  columns: ColumnsType<T>;
  data: T[];
  rowKey: string;
  emptyMessage?: string;
}

export function DataTable<T extends object>({ columns, data, rowKey, emptyMessage }: DataTableProps<T>) {
  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey={rowKey}
      pagination={false}
      locale={{ emptyText: emptyMessage ?? "No records found" }}
      className="rounded-xl border border-border-subtle bg-white/80 shadow-soft dark:bg-surface-muted"
    />
  );
}
