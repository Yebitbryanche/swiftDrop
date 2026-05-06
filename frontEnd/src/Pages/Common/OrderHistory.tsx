import { useState } from "react"
import history from "../../assets/images/history icon.jpg"
import { HiListBullet } from 'react-icons/hi2'
import DeliveryHistoryCard from "../../Components/UI/Cards/OrderHistoryCard"

const OrderHistory = () => {
  const [orders, setOrders] = useState(true)
  return (
    <div className='p-3'>
        <div className='flex flex-row gap-x-2 items-center'>
            <h2 className='font-medium md:text-2xl sm:text-xl text-lg'>
                Order History
            </h2>
            <div className='p-2 rounded-full bg-green-100'>
                <HiListBullet size={25} color="#21b723"/>
            </div>
      </div>
      {!orders?
        <div className="relative">
          <div className="w-[60%] absolute top-5 left-[20%] flex flex-col items-center gap-y-2" >
              <img src={history} className="w-full"/>
              <h3 className="font-medium md:text-2xl sm:text-md text-sm">Nothing Here!</h3>
              <p className="md:text-md sm:text-sm text-xs text-gray-500 text-center">place an order to see your order history here</p>
          </div>
        </div>
        :
        <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 mt-10'>
        <DeliveryHistoryCard/>
        <DeliveryHistoryCard/>
        </div>
        }
    </div>
  )
}

export default OrderHistory
