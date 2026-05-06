import type { JSX } from "react";
import {
  FaBell,
  FaTruck,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";

type NotificationType = "order" | "success" | "alert" | "general";

const iconMap: Record<NotificationType, JSX.Element> = {
  order: <FaTruck className="text-yellow-500" />,
  success: <FaCheckCircle className="text-green-500" />,
  alert: <FaExclamationCircle className="text-red-500" />,
  general: <FaBell className="text-gray-500" />,
};

export const NotificationCard = ({
  type = "general",
  title,
  message,
  time,
  unread = true,
}: {
  type?: NotificationType;
  title: string;
  message: string;
  time: string;
  unread?: boolean;
}) => {
  return (
    <div className="flex gap-3 p-4 rounded-2xl shadow-sm bg-white hover:shadow-md transition">

      {/* ICON */}
      <div className="text-xl mt-1">
        {iconMap[type]}
      </div>

      {/* CONTENT */}
      <div className="flex-1">

        <div className="flex justify-between">
          <h3 className="text-sm font-semibold text-gray-800">
            {title}
          </h3>
          <span className="text-xs text-gray-400">{time}</span>
        </div>

        <p className="text-xs text-gray-500 mt-1">
          {message}
        </p>

      </div>

      {/* UNREAD DOT */}
      {unread && (
        <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2" />
      )}

    </div>
  );
};