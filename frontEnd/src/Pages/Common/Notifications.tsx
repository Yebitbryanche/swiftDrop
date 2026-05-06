import { HiBell } from "react-icons/hi2";
import { NotificationCard } from "../../Components/UI/Cards/NotificationCard";


const Notifications = () => {
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
    <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 mt-10">
      <NotificationCard type="order" message="Good — notification cards are where your app either feels premium or “basic alert spam”. We’ll design them like a modern delivery app notification feed (clean, actionable, scannable)." time="19:00" title="Hello"/>
      <NotificationCard type="success" message="Good — notification cards are where your app either feels premium or “basic alert spam”. We’ll design them like a modern delivery app notification feed (clean, actionable, scannable)." time="19:00" title="Hello"/>
      <NotificationCard type="alert" message="Good — notification cards are where your app either feels premium or “basic alert spam”. We’ll design them like a modern delivery app notification feed (clean, actionable, scannable)." time="19:00" title="Hello"/>
    </div>
    </div>
  );
}

export default Notifications;
