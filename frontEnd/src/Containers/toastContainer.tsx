// containers/ToastContainer.tsx
import { useToast } from "../context/toastContext";
import { Toast } from "../Components/UI/Toast/Toast";

export const ToastContainer = () => {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed bottom-5 right-5 z-[99999] flex flex-col gap-3">
      {toasts.map((toast) => (
        <div key={toast.id} className="relative w-[320px]">
          <Toast
            type={toast.type}
            title={toast.title}
            message={toast.message}
          />

          <button
            onClick={() => removeToast(toast.id)}
            className="absolute top-2 right-2 text-gray-600 hover:text-black"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
};