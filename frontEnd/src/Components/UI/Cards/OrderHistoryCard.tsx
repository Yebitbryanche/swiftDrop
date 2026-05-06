import { HiMapPin } from "react-icons/hi2";
import { FaDotCircle } from "react-icons/fa";
import { IoIosBicycle } from "react-icons/io";

const statusStyles = {
  delivered: "text-green-500 bg-green-50",
  cancelled: "text-red-500 bg-red-50",
  pending: "text-yellow-600 bg-yellow-50",
};

const DeliveryHistoryCard = () => {
  const delivery = {
    status: "delivered",
    agentName: "John Doe",
    vehicle: "Motorcycle",
    pickup: "Akwa, Douala",
    destination: "Bonanjo, Douala",
    date: "May 01, 2026",
    time: "14:35",
    price: "1200 XAF",
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-4 w-full max-w-md">

      {/* TOP ROW */}
      <div className="flex justify-between items-start">

        <div>
          <h3 className="font-semibold text-gray-800">
            Delivery Order
          </h3>

          <p className="text-xs text-gray-500">
            {delivery.date} • {delivery.time}
          </p>
        </div>

        {/* STATUS BADGE */}
        <div
          className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
            statusStyles.delivered
          }`}
        >
          <FaDotCircle size={8} />
          {delivery.status}
        </div>
      </div>

      {/* ROUTE */}
      <div className="mt-4 space-y-2 text-sm text-gray-600">

        <div className="flex items-center gap-2">
          <HiMapPin className="text-gray-400" />
          <span>
            <span className="font-medium text-gray-700">From:</span>{" "}
            {delivery.pickup}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <HiMapPin className="text-gray-400" />
          <span>
            <span className="font-medium text-gray-700">To:</span>{" "}
            {delivery.destination}
          </span>
        </div>

      </div>

      {/* AGENT INFO */}
      <div className="mt-4 flex items-center justify-between bg-gray-50 rounded-xl p-3">

        <div className="flex items-center gap-2">
          <IoIosBicycle className="text-gray-500" />
          <div>
            <p className="text-sm font-medium text-gray-700">
              {delivery.agentName}
            </p>
            <p className="text-xs text-gray-500">
              {delivery.vehicle}
            </p>
          </div>
        </div>

        {/* PRICE */}
        <div className="text-right">
          <p className="text-sm font-semibold text-gray-800">
            {delivery.price}
          </p>
          <p className="text-xs text-gray-500">Paid</p>
        </div>

      </div>
    </div>
  );
};

export default DeliveryHistoryCard;