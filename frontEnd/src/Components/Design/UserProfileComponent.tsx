import { FaPhone, FaEnvelope, FaMotorcycle, FaClock, FaMoneyBillWave, FaUserEdit } from "react-icons/fa";
import { HiLocationMarker } from "react-icons/hi";
import type { UserTypes } from "../../types/userTypes";
import { useNavigate, Link } from "react-router-dom";

type Props = {
  user: UserTypes | null;
  onToggleStatus?: () => void;
  loading:boolean
};

const UserProfileCard = ({ user, onToggleStatus, loading }: Props) => {
  const navigate = useNavigate()


  return (
    // Container now uses min-h-screen and a more subtle background
      <div className="mx-auto">
        
        {/* MAIN WRAPPER */}
        <div className="bg-white shadow-2xl overflow-hidden border border-gray-100">
          
          {/* HERO SECTION / HEADER */}
          <div className="relative h-48 md:h-64 bg-gradient-to-r from-yellow-400 to-yellow-600">
            <Link to={'/upload_avatar'} className="p-3 text-xl font-medium text-white hover:text-green-500">Change Avatar</Link>
            <div className="absolute -bottom-16 left-8 md:left-12 flex items-end gap-6">
              <div className="relative" onClick={() => navigate('/upload_avatar')}>
                <img
                  src={user?.profile_url || "https://via.placeholder.com/150"}
                  alt="profile"
                  className="w-32 h-32 md:w-44 md:h-44 rounded-full object-cover border-5 border-white shadow-xl"
                />
                <span className={`absolute bottom-2 right-2 w-6 h-6 rounded-full border-4 border-white ${user?.status ? 'bg-green-500' : 'bg-red-500'}`}></span>
              </div>
              <div className="mb-4 hidden md:block">
                <h1 className="text-4xl font-bold text-gray-900 drop-shadow-sm">{user?.user_name}</h1>
                <p className="text-gray-700 font-medium flex items-center gap-2">
                  {user?.role} • <span className="text-yellow-800 uppercase text-xs tracking-widest bg-yellow-200 px-2 py-0.5 rounded">{user?.id?.slice(0, 8)}</span>
                </p>
              </div>
            </div>
          </div>

          {/* CONTENT AREA */}
          <div className="pt-20 pb-12 px-3 md:px-12">
            
            {/* MOBILE TITLE (Only shows on small screens) */}
            <div className="md:hidden mb-8">
              <h1 className="md:text-3xl text-2xl font-bold text-gray-900">{user?.user_name}</h1>
              <p className="text-gray-500">{user?.role}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              
              {/* LEFT COLUMN: PRIMARY INFO */}
              <div className="lg:col-span-2 space-y-10">
                
                {/* BIO / QUICK ACTIONS */}
                <section>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="md:text-lg text-md font-bold text-gray-800 flex items-center gap-2">
                      <FaUserEdit className="text-yellow-500" /> Account Overview
                    </h3>
                    <button
                      onClick={onToggleStatus}
                      disabled={loading}
                      className={`flex md:text-lg text-sm items-center gap-2 px-6 py-3 cursor-pointer rounded-2xl font-bold transition-all transform active:scale-95 shadow-md ${
                        user?.status
                          ? "bg-green-100 text-green-700 hover:bg-green-200"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {loading ? "Processing..." : user?.status ? "🟢 Go Offline" : "🔴 Go Online"}
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                      <p className="text-sm text-gray-500 mb-1">Email Address</p>
                      <p className="font-medium text-gray-800 flex items-center gap-2">
                        <FaEnvelope className="text-yellow-600" /> {user?.email}
                      </p>
                    </div>
                    <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                      <p className="text-sm text-gray-500 mb-1">Phone Number</p>
                      <p className="font-medium text-gray-800 flex items-center gap-2">
                        <FaPhone className="text-yellow-600" /> {user?.phone || "Not Verified"}
                      </p>
                    </div>
                  </div>
                </section>

                {/* LOGISTICS SECTION */}
                <section>
                  <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <FaMotorcycle className="text-yellow-500" /> Logistics & Presence
                  </h3>
                  <div className="bg-white border-2 border-yellow-50 rounded-3xl p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-yellow-100 rounded-2xl flex items-center justify-center shrink-0">
                        <HiLocationMarker className="text-yellow-600 text-2xl" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Office Location</p>
                        <p className="font-semibold text-gray-700">{user?.office_location || "Assigning..."}</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-yellow-100 rounded-2xl flex items-center justify-center shrink-0">
                        <FaMotorcycle className="text-yellow-600 text-2xl" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Vehicle Type</p>
                        <p className="font-semibold text-gray-700">{user?.vehicle || "No Vehicle Linked"}</p>
                      </div>
                    </div>
                  </div>
                </section>
              </div>

              {/* RIGHT COLUMN: STATS CARDS */}
              <div className="space-y-6">
                <div className="bg-gray-900 rounded-[2rem] p-8 text-white shadow-xl relative overflow-hidden">
                  <div className="relative z-10">
                    <p className="opacity-60 text-sm mb-1 uppercase tracking-tighter">Charge Fee</p>
                    <h2 className="text-4xl font-bold mb-6 italic">{user?.delivery_fee || 0} <span className="text-lg not-italic text-yellow-500">FCFA</span></h2>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center text-sm border-b border-gray-800 pb-2">
                        <span className="flex items-center gap-2"><FaClock className="text-yellow-500"/> Shifts</span>
                        <span className="font-mono">{user?.working_hours || "Flexible"}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="flex items-center gap-2"><FaMoneyBillWave className="text-yellow-500"/> Fee Basis</span>
                        <span>Per Delivery</span>
                      </div>
                    </div>
                  </div>
                  {/* Decorative Circle */}
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-500/10 rounded-full"></div>
                </div>

                <div className="bg-yellow-500 rounded-[2rem] p-8 text-yellow-950 shadow-lg">
                  <h4 className="font-bold mb-2">Performance Tip</h4>
                  <p className="text-sm leading-relaxed opacity-90">
                    Keep your status <strong>Online</strong> during peak hours (11AM - 2PM) to increase your delivery requests by up to 40%.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
  );
};

export default UserProfileCard;