import { HiClock, HiMapPin, HiStar } from "react-icons/hi2";
import { IoIosBicycle } from "react-icons/io";
import { FaDotCircle } from "react-icons/fa";

export default function AgentDetailPage() {
  // mock data (replace with API later)
  const agent = {
    name: "John Doe",
    email: "johndoe@email.com",
    phone: "+237 6XX XXX XXX",
    location: "Douala",
    vehicle: "Motorcycle",
    rating: 3.5,
    deliveryTime: "30 mins",
    status: "active", // active | busy
    officeLocation: "Akwa, Douala",
    workingHours: "8:00 AM - 6:00 PM",
    deliveryFee: "1000 XAF",
  };

  const isActive = agent.status === "active";

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100 px-4 py-8 flex justify-center">

      <div className="w-full max-w-lg bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-800">
            Agent Details
          </h1>

          <div
            className={`flex items-center gap-2 text-sm font-medium ${
              isActive ? "text-green-500" : "text-red-500"
            }`}
          >
            <FaDotCircle size={10} />
            {isActive ? "Available" : "Busy"}
          </div>
        </div>

        {/* Profile */}
        <div className="flex items-center gap-4 mt-6">
          <div className="w-20 h-20 rounded-xl bg-gray-100 shadow-sm" />

          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              {agent.name}
            </h2>
            <p className="text-sm text-gray-500">{agent.email}</p>
            <p className="text-sm text-gray-500">{agent.phone}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mt-6">

          <div className="bg-gray-50 rounded-xl p-3 flex items-center gap-2">
            <HiClock className="text-gray-500" />
            <div>
              <p className="text-xs text-gray-400">Delivery Time</p>
              <p className="text-sm font-medium">{agent.deliveryTime}</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-3 flex items-center gap-2">
            <HiStar className="text-yellow-500" />
            <div>
              <p className="text-xs text-gray-400">Rating</p>
              <p className="text-sm font-medium">{agent.rating}/5</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-3 flex items-center gap-2">
            <IoIosBicycle className="text-gray-500" />
            <div>
              <p className="text-xs text-gray-400">Vehicle</p>
              <p className="text-sm font-medium">{agent.vehicle}</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-3 flex items-center gap-2">
            <HiMapPin className="text-gray-500" />
            <div>
              <p className="text-xs text-gray-400">Location</p>
              <p className="text-sm font-medium">{agent.location}</p>
            </div>
          </div>
        </div>

        {/* Credentials Section */}
        <div className="mt-6 space-y-3">
          <h3 className="text-sm font-semibold text-gray-700">
            Agent Information
          </h3>

          <div className="bg-gray-50 p-3 rounded-xl text-sm text-gray-600">
            <p><span className="font-medium">Office:</span> {agent.officeLocation}</p>
            <p><span className="font-medium">Working Hours:</span> {agent.workingHours}</p>
            <p><span className="font-medium">Delivery Fee:</span> {agent.deliveryFee}</p>
          </div>
        </div>

        {/* Request Button */}
        <button
          disabled={!isActive}
          className={`w-full mt-6 py-3 rounded-xl font-medium text-white transition ${
            isActive
              ? "bg-yellow-500 hover:bg-yellow-600"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          {isActive ? "Request Order" : "Agent Currently Busy"}
        </button>
      </div>
    </div>
  );
}