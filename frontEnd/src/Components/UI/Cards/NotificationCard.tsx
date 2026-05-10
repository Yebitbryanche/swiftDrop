import type { JSX } from "react";
import {
  FaBell,
  FaTruck,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";

import type { NotificationType } from "../../../types/userTypes";
import { formatDate } from "../../utils/function";

const iconMap: Record<NotificationType, JSX.Element> = {
  Delivery: <FaTruck className="text-yellow-500" />,
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
  markas_read,
  cancle_request,
}: {
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  unread?: boolean;
  markas_read: () => void;
  cancle_request: () => void;
}) => {
  return (
    <div
      className={`
        flex gap-3 p-4 rounded-2xl shadow-sm transition
        hover:shadow-md bg-white
        ${unread ? "border-l-4 border-yellow-500" : ""}
      `}
    >

      {/* ICON */}
      <div className="text-xl mt-1">
        {iconMap[type]}
      </div>

      {/* CONTENT */}
      <div className="flex-1">

        {/* TOP */}
        <div className="flex justify-between items-start gap-2">

          <div>
            <h3 className="text-sm font-semibold text-gray-800">
              {title}
            </h3>

            <p className="text-xs text-gray-500 mt-1 leading-relaxed">
              {message}
            </p>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex flex-col items-end gap-2">

            <span className="text-xs text-gray-400 whitespace-nowrap">
              {formatDate(time)}
            </span>

            {/* UNREAD DOT */}
            {unread && (
              <div className="w-2 h-2 bg-yellow-500 rounded-full" />
            )}

          </div>
        </div>

        {/* ACTIONS */}
        {unread && (
          <div className="mt-3 flex justify-between">

           {type === 'Delivery' && <button
              onClick={cancle_request}
              className="
                text-xs
                font-medium
                text-red-600
                hover:text-yellow-700
                hover:bg-yellow-50
                px-3
                py-1
                rounded-lg
                transition
              "
            >
              Decline Request
            </button>}

            <button
              onClick={markas_read}
              className="
                text-xs
                font-medium
                text-yellow-600
                hover:text-yellow-700
                hover:bg-yellow-50
                px-3
                py-1
                rounded-lg
                transition
              "
            >
              Mark as read
            </button>

          </div>
        )}

      </div>
    </div>
  );
};