import { HiBell } from "react-icons/hi2";
import { NotificationCard } from "../../Components/UI/Cards/NotificationCard";
import Loader from "../../Components/UI/loader/Loader";
import emptyState from '../../assets/images/undraw_remote-cabin_6x4q.png'
import { useNotification } from "../../hooks/NotificationHook";
import { cancleRequest, markNotificationAsRead } from "../../Components/Design/requests";
import { useToast } from "../../context/toastContext";



const Notifications = () => {
  const {notification,loading, fetchNotifications} = useNotification()
  const {showToast} = useToast()

const handleReadNotification = async (
  notificationId: string
) => {
  try {
    await markNotificationAsRead(notificationId);

    fetchNotifications();

    showToast({
      type: "success",
      title: "Updated",
      message: "Notification marked as read",
    });

  } catch (error) {
    console.error(error);
  }
};

const handleRequestCancle = async (delivery_id:string, notification_id:string) => {
  try{
    const response = await cancleRequest(delivery_id)
    await handleReadNotification(notification_id)
    console.log(response.data)
  }
  catch(error:any){
    console.error(error.response.data)
  }
}



  return (
    <div className="p-3 mb-15 xs:mb-none">
      <div className='flex flex-row gap-x-2 items-center'>
          <h2 className='font-medium md:text-2xl sm:text-xl text-lg'>
              Notifications
          </h2>
          <div className='p-2 rounded-full bg-green-100'>
              <HiBell size={25} color="#21b723"/>
          </div>
    </div>

      {notification.length === 0?
        <div className="flex justify-center items-center min-h-screen">
          <div className="w-[60%] flex flex-col items-center gap-y-2 text-center">
            <img src={emptyState} className="w-full" />
            <h3 className="font-medium md:text-2xl sm:text-md text-sm">
              No Notifications Yet!
            </h3>
            <p className="md:text-md sm:text-sm text-xs text-gray-500">
              You will see all Notifications here
            </p>
          </div>
        </div>:
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 mt-10">
      {notification.map((notification) => (
          <NotificationCard
            cancle_request={() => handleRequestCancle(notification.delivery_id, notification.id)}
            markas_read={() => {handleReadNotification(notification.id)}}
            key={notification.id}
            type={notification.type}
            title={notification.title}
            message={notification.message}
            time={notification.created_at}
            unread={notification.unread}/>
      ))}
        </div>}
    {loading && <Loader/>}
    </div> 
  );
}

export default Notifications;
