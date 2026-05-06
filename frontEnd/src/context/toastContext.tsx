// context/toastContext.tsx
import React, { createContext, useContext, useState } from "react";

export type ToastType = "success" | "error" | "info" | "warning";

export type ToastItem = {
  id: string;
  type: ToastType;
  title: string;
  message: string;
};

type ToastContextType = {
  toasts: ToastItem[];
  showToast: (toast: Omit<ToastItem, "id">, duration?: number) => void;
  removeToast: (id: string) => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const showToast = (toast: Omit<ToastItem, "id">, duration = 3000) => {
    const id = crypto.randomUUID();

    setToasts((prev) => [...prev, { ...toast, id }]);

    // auto remove
    setTimeout(() => {
      removeToast(id);
    }, duration);
  };

  return (
    <ToastContext.Provider value={{ toasts, showToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside ToastProvider");
  return ctx;
};