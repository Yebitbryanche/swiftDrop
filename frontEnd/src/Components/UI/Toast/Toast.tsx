// components/Toast.tsx
import {
  FaCheckCircle,
  FaTimesCircle,
  FaInfoCircle,
  FaExclamationTriangle,
} from "react-icons/fa";

export type ToastType = "success" | "error" | "info" | "warning";

const toastStyles = {
  success: "bg-green-50 text-green-700 border-green-200",
  error: "bg-red-50 text-red-700 border-red-200",
  info: "bg-blue-50 text-blue-700 border-blue-200",
  warning: "bg-yellow-50 text-yellow-700 border-yellow-200",
};

const toastIcons = {
  success: <FaCheckCircle />,
  error: <FaTimesCircle />,
  info: <FaInfoCircle />,
  warning: <FaExclamationTriangle />,
};

export const Toast = ({
  type = "info",
  title,
  message,
}: {
  type?: ToastType;
  title: string;
  message: string;
}) => {
  return (
    <div
      className={`w-[320px] p-4 rounded-2xl shadow-lg border flex gap-3 items-start transition-all bg-white ${toastStyles[type]}`}
    >
      {/* icon bubble */}
      <div className="text-xl mt-0.5">
        {toastIcons[type]}
      </div>

      {/* content */}
      <div className="flex-1">
        <p className="font-semibold text-sm">{title}</p>
        <p className="text-xs text-gray-600 mt-1">{message}</p>
      </div>
    </div>
  );
};