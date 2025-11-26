"use client";

import { Modal as AntdModal } from "antd";
import type { ReactNode } from "react";

interface ModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
}

export function Modal({ open, title, onClose, children }: ModalProps) {
  return (
    <AntdModal open={open} onCancel={onClose} onOk={onClose} title={title} centered footer={null}>
      {children}
    </AntdModal>
  );
}
