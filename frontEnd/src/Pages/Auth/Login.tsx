import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../../Components/UI/input/InputField";
import { useAuth } from "../../hooks/AuthHook";
import { useToast } from "../../context/toastContext";
import Loader from "../../Components/UI/loader/Loader";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {showToast} = useToast()
  const {login} = useAuth()
  const navigate = useNavigate()



  const handleSubmit = async (e:any) => {
    e.preventDefault();
    if (!email || !password) {
      showToast({
        type: "error",
        title: "Credential Error",
        message: "Email and password are required",
      });
      return;
    }

    try{
      setLoading(true)
      await login(email, password)
      navigate('/')
    }
    catch(error:any){
      showToast({
        type: "error",
        title: "Request Failed",
        message: error?.response?.data?.detail || "Something went wrong",
      });
      return;
    }
    finally{
      setLoading(false)
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden bg-gray-50">

      {/* 🌈 Background Gradient Shapes */}
      <div className="absolute w-72 h-72 bg-yellow-300 rounded-full blur-3xl opacity-30 top-[-80px] left-[-80px]" />
      <div className="absolute w-80 h-80 bg-orange-300 rounded-full blur-3xl opacity-30 bottom-[-100px] right-[-100px]" />
      <div className="absolute w-60 h-60 bg-yellow-500 rounded-full blur-3xl opacity-20 top-[40%] left-[60%]" />
      <div className="absolute w-52 h-52 bg-amber-400 rounded-full blur-3xl opacity-20 top-[20%] right-[20%]" />

      {/* Card */}
      <div className="relative w-full max-w-md bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 sm:p-8 z-10">

        {/* Header */}
        <h1 className="text-2xl font-bold text-gray-800 mb-1">
          Welcome Back 👋
        </h1>
        <p className="text-gray-500 text-sm mb-6">
          Login to continue your deliveries
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

            <InputField
                placeholder="Email Address"
                type="email"
                onChange={(text) => {setEmail(text)}}
                value={email}/>


            <InputField
                placeholder="Password"
                type="password"
                onChange={(text) => {setPassword(text)}}
                value={password}/>


          <div className="flex justify-end">
            <button
              type="button"
              className="text-sm text-yellow-600 hover:underline"
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl text-white font-medium transition ${
              loading
                ? "bg-yellow-400 cursor-not-allowed"
                : "bg-yellow-500 hover:bg-yellow-600"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don’t have an account?{" "}
          <Link to="/register" className="text-yellow-600 font-medium hover:underline">
            Register
          </Link>
        </p>
      </div>
      {
        loading && <Loader/>
      }
    </div>
  );
}