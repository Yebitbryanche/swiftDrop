import { HiClock, HiMapPin, HiStar } from "react-icons/hi2";
import Profile from "../../../assets/icons/user-rounded-svgrepo-com.svg?react";
import { IoIosBicycle } from "react-icons/io";
import { FaDotCircle } from "react-icons/fa";

interface AgentCardProps {
  name: string;
  isActive: boolean;
  deliveryTime: string;
  vehicle: string;
  location: string;
  rating: number;
  key:string;
  onOrder?: () => void;
  profile_url:string
}

const AgentCard = ({
  name,
  isActive,
  deliveryTime,
  vehicle,
  location,
  rating,
  onOrder,
  profile_url,
}: AgentCardProps) => {
  return (
    <div className="bg-white shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl p-4">

      {/* Top section */}
      <div className="flex justify-between items-start">
        <div className="flex gap-3">
          {!profile_url?
            <Profile className="w-[75px] h-[75px] sm:w-[85px] sm:h-[85px] rounded-xl shadow-sm bg-gray-50 p-1" />:
            <img src={profile_url} className="w-[75px] h-[75px] sm:w-[85px] sm:h-[85px] rounded-xl shadow-sm bg-gray-50 p-1"/>
            }

          <div className="space-y-1">
            <h3 className="font-semibold text-gray-800 text-lg">
              {name}
            </h3>

            <p className="text-sm text-gray-500">
              Verified Delivery Agent
            </p>

            {/* ✅ STATUS */}
            <div
              className={`flex items-center gap-1 ${
                isActive ? "text-green-500" : "text-red-500"
              }`}
            >
              <FaDotCircle size={10} />
              <span className="text-xs font-medium">
                {isActive ? "Active now" : "Unavailable"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 mt-5">
        <div className="flex items-center gap-2 bg-gray-50 rounded-xl p-3">
          <HiClock className="text-gray-500" />
          <div>
            <p className="text-xs text-gray-400">Work Hours</p>
            <p className="text-sm font-medium text-gray-700">
              {deliveryTime}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-gray-50 rounded-xl p-3">
          <IoIosBicycle className="text-gray-500" />
          <div>
            <p className="text-xs text-gray-400">Vehicle</p>
            <p className="text-sm font-medium text-gray-700">
              {vehicle}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-gray-50 rounded-xl p-3">
          <HiMapPin className="text-gray-500" />
          <div>
            <p className="text-xs text-gray-400">Location</p>
            <p className="text-sm font-medium text-gray-700">
              {location}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-gray-50 rounded-xl p-3">
          <HiStar className="text-yellow-500" />
          <div>
            <p className="text-xs text-gray-400">Rating</p>
            <p className="text-sm font-medium text-gray-700">
              {rating} / 5
            </p>
          </div>
        </div>
      </div>

      {/* Button */}
      <button
        onClick={onOrder}
        disabled={!isActive}
        className={`w-full mt-5 transition text-white font-medium py-3 rounded-xl shadow-sm
          ${
            isActive
              ? "bg-yellow-500 hover:bg-yellow-600 cursor-pointer"
              : "bg-gray-300 cursor-not-allowed"
          }`}
      >
        {isActive ? "Place Order" : "Unavailable"}
      </button>
    </div>
  );
};

export default AgentCard;