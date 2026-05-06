import { useState } from "react";
import InputField from "../../Components/UI/input/InputField";
import { createAccount } from "../../Components/Design/requests";
import { useNavigate } from "react-router-dom";
import Loader from "../../Components/UI/loader/Loader";
import { useToast } from "../../context/toastContext";

export default function RegisterPage() {
  const [role, setRole] = useState("user");
  const [full_name, setFull_name] = useState('')
  const [phone, setPhone] = useState<string>('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [office_location, setOffice_location] = useState('')
  const [deliver_fee, setDelivery_fee] = useState<number>(0)
  const [working_hours, setWorking_hours] = useState('')
  const [Vehicle,setVehicle] = useState('')
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false)
  const {showToast} = useToast()
  const navigate = useNavigate()

  const handleImageChange = (e:any) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

const handleRegister = async (e: any) => {
  e.preventDefault(); // move this to the top

  // validation block (STOP immediately if invalid)
  if (!full_name) {
    showToast({
      type: "error",
      title: "Credential Error",
      message: "Name is required",
    });
    return; // ❗ STOP HERE (no redirect, no API call)
  }

  if (!email || !password) {
    showToast({
      type: "error",
      title: "Credential Error",
      message: "Email and password are required",
    });
    return;
  }

  try {
    setLoading(true);

    const response = await createAccount(
      full_name,
      phone,
      email,
      password,
      role,
      office_location,
      deliver_fee,
      working_hours,
      Vehicle
    );

    showToast({
      type: "success",
      title: "Success",
      message: "Account created successfully",
    });
    console.log(response)
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  } catch (error: any) {
    console.error(error?.response?.data);

    showToast({
      type: "error",
      title: "Request Failed",
      message: error?.response?.data?.detail || "Something went wrong",
    });

    return; // IMPORTANT: stop execution
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-6 sm:p-8">

        {/* Header */}
        <h1 className="text-2xl font-bold text-gray-800 mb-1">
          Create Account
        </h1>
        <p className="text-gray-500 mb-6 text-sm">
          Join and start delivering or receiving packages easily
        </p>

        {/* Profile Upload */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center shadow-sm">
            {image ? (
              <img src={image} alt="preview" className="w-full h-full object-cover" />
            ) : (
              <span className="text-gray-400 text-sm">Upload</span>
            )}
          </div>

          <label className="mt-3 cursor-pointer text-yellow-600 text-sm font-medium">
            Choose Profile Picture
            <input
              type="file"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        </div>

        {/* Form */}
        <form className="space-y-4">
            <InputField
                placeholder="Full Name"
                type="text"
                onChange={(text) => {setFull_name(text)}}
                value={full_name}/>

            <InputField
                placeholder="phone Number"
                type="tel"
                onChange={(phone) => {setPhone(phone)}}
                value={phone}/>

            <InputField
                placeholder="Email Address"
                type="email"
                onChange={(email) => {setEmail(email)}}
                value={email}/>
                
            <InputField
                placeholder="Password"
                type="password"
                onChange={(password) => {setPassword(password)}}
                value={password}/>


          {/* Role Selection */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setRole("User")}
              className={`flex-1 p-3 rounded-xl text-sm font-medium transition ${
                role === "user"
                  ? "bg-yellow-500 text-white shadow"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              User
            </button>

            <button
              type="button"
              onClick={() => setRole("Agent")}
              className={`flex-1 p-3 rounded-xl text-sm font-medium transition ${
                role === "Agent"
                  ? "bg-yellow-500 text-white shadow"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              Agent
            </button>
          </div>

          {/* Agent Fields */}
          {role === "Agent" && (
            <div className="space-y-4 mt-4 bg-yellow-50 p-4 rounded-xl">

            <InputField
                placeholder="Office Location"
                type="text"
                onChange={(text) => {setOffice_location(text)}}
                value={office_location}/>

            <InputField
                placeholder="Delivery Fee"
                type="number"
                onChange={(text) => {setDelivery_fee(parseFloat(text))}}
                value={String(deliver_fee)}/>

            <InputField
                placeholder="Working Hours (e.g. 8am - 6pm)"
                type="text"
                onChange={(text) => {setWorking_hours(text)}}
                value={working_hours}/>

            <InputField
                placeholder="Vehicle Type (Bike, Car, Van...)"
                type="text"
                onChange={(t) => {setVehicle(t)}}
                value={Vehicle}/>
            </div>
          )}

          {/* Submit */}
          <button
            onClick={handleRegister}
            type="submit"
            className="w-full mt-4 bg-yellow-500 hover:bg-yellow-600 transition text-white font-medium py-3 rounded-xl shadow-md"
          >
            Create Account
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <span className="text-yellow-600 font-medium cursor-pointer">
            Login
          </span>
        </p>
      </div>
      {
        loading && <Loader/>
      }
    </div>
  );
}