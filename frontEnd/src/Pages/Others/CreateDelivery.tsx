import { useState } from "react";
import { HiX } from "react-icons/hi";
import InputField from "../../Components/UI/input/InputField";
import { useParams } from "react-router-dom";
import { place_orderRequest } from "../../Components/Design/requests";
import { useAuth } from "../../hooks/AuthHook";
import Loader from "../../Components/UI/loader/Loader";
import { useToast } from "../../context/toastContext";

const CreateDelivery = () => {
  const [image, setImage] = useState<string | null>(null);
  const [item_type, setItem_type] = useState("normal");
  const [pickupLocation, setPickupLocation] = useState('')
  const [deliveryLocation, setDeliverLocation] = useState('')
  const [loading, setLoading] = useState(false)
  const {agent_id} = useParams()
  const {user} = useAuth()
  const {showToast} = useToast()


// function to send request
const PlaceOrder = async () => {
  if(!pickupLocation){
    showToast({
      type:"error",
      title:"Error",
      message:"Pick up location must be set"
    })
    return
  }

  if(!pickupLocation){
    showToast({
      type:"error",
      title:"Error",
      message:"Delivery location must be set"
    })
    return
  }

  try{
    setLoading(true)
    const response = await place_orderRequest(agent_id,user?.id,pickupLocation,deliveryLocation,item_type );
    console.log(response.data)
    showToast({
      type:"success",
      title:"Success",
      message:"Request has been placed successfully"
    })
  }
  catch(error:any){
    console.error(error.response.data)
    if(!pickupLocation){
      showToast({
        type:"error",
        title:"Error",
        message:error.response.data.detail
      })
      return
    }
  }
  finally{
    setLoading(false)
  }
}


// function to hndle image change
  const handleImageChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImage(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100 flex flex-col mb-15 xs:mb-none">

      {/* Header */}
      <div className="px-5 pt-6 pb-4">
        <h1 className="text-xl font-bold text-gray-800">
          Request Delivery
        </h1>
        <p className="text-sm text-gray-500">
          Fill in the details to create your order
        </p>
      </div>

      {/* Form */}
      <div className="flex-1 px-5 space-y-4 pb-10">

        {/* Pickup */}
        <InputField
        placeholder="Pickup Location"
        onChange={(text) => {setPickupLocation(text)}}
        value={pickupLocation}
        type="text"/>

        {/* Delivery */}
        <InputField
        placeholder="Delivery Location"
        onChange={(text) => {setDeliverLocation(text)}}
        value={deliveryLocation}
        type="text"/>

        {/* Product Type */}
        <div className="bg-white rounded-xl shadow-sm p-3">
          <p className="text-xs text-gray-500 mb-2">Product Type</p>

          <select
            value={item_type}
            onChange={(e) => setItem_type(e.target.value)}
            className="w-full bg-transparent outline-none text-sm text-gray-700"
          >
            <option value="normal">Normal</option>
            <option value="fragile">Fragile</option>
            <option value="heavy">Heavy</option>
            <option value="food">Food</option>
            <option value="electronics">Electronics</option>
          </select>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-xl shadow-sm p-4 text-center">
          <label className="text-sm text-yellow-600 font-medium cursor-pointer">
            Upload Item Image
            <input
              type="file"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        </div>

        {/* ✅ NEW: IMAGE PREVIEW SECTION */}
        {image && (
          <div className="relative bg-white rounded-2xl shadow-md overflow-hidden">

            {/* remove button */}
            <button
              onClick={removeImage}
              className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full"
            >
              <HiX size={16} />
            </button>

            {/* preview image */}
            <img
              src={image}
              alt="preview"
              className="w-full h-56 object-cover"
            />

            <div className="p-3">
              <p className="text-sm font-medium text-gray-700">
                Item Preview
              </p>
              <p className="text-xs text-gray-500">
                This is how your package image will appear
              </p>
            </div>
          </div>
        )}
      </div>

      {/* CTA Button */}
      <div className="p-4 bg-white/90 backdrop-blur-xl shadow-md">
        <button onClick={PlaceOrder} className="w-full py-3 rounded-2xl bg-yellow-500 hover:bg-yellow-600 transition text-white font-medium shadow-md">
          Create Request
        </button>
      </div>
      {
        loading && <Loader/>
      }
    </div>
  );
};

export default CreateDelivery;