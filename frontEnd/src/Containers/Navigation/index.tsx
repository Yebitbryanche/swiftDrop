import { useState } from 'react'
import { HiMenu } from 'react-icons/hi'
import { HiBell, HiHome, HiListBullet, HiQueueList, HiUser } from 'react-icons/hi2'
import { NavLink } from 'react-router-dom'
import { useNotification } from '../../hooks/NotificationHook'
import { FaCircle } from 'react-icons/fa'

function Navigation() {
    const [navOpened,setNaveOpened] = useState(false)
    const {notificationCount,notification} = useNotification()
  return (
    <>
    {navOpened 
        ?
            <nav 
                className='fixed bottom-3 flex bg-white z-50 flex-row w-[92%] right-[4%] px-4 py-2 rounded-full shadow-sm inset-xl md:flex-col md:right-3 md:top-[8%] md:h-[84%] md:w-[65px] md:p-3 bg-white md:shadow-lg inset-xs md:rounded-xl justify-between'
                onDoubleClick={() => setNaveOpened(false)}>
                <NavLink to={'/'}
                    className={({isActive}) =>
                    isActive
                    ? "text-white p-2 bg-yellow-500 flex flex-col items-center rounded-lg"
                    : "text-gray-400 flex flex-col items-center p-2"}>
                    <HiHome size={25}/>
                    {/* <p className='text-sm'>Home</p> */}
                </NavLink>

                <NavLink to={'/profile'}
                    className={({isActive}) =>
                    isActive
                    ? "text-white p-2 bg-yellow-500 flex flex-col items-center rounded-lg"
                    : "text-gray-400 flex flex-col items-center p-2"}>
                    <HiUser size={25}/>
                    {/* <p className='text-sm'>Notifications</p> */}
                </NavLink>
                
                <NavLink to={'/faq'}
                    className={({isActive}) =>
                    isActive
                    ? "text-white p-2 bg-yellow-500 flex flex-col items-center rounded-lg"
                    : "text-gray-400 flex flex-col items-center p-2"}>
                    <HiQueueList size={25}/>
                    {/* <p className='text-sm'>FAQ</p> */}
                </NavLink>

                <NavLink to={'/orderhistory'}
                    className={({isActive}) =>
                    isActive
                    ? "text-white p-2 bg-yellow-500 flex flex-col items-center rounded-lg"
                    : "text-gray-400 flex flex-col items-center p-2"}>
                    <HiListBullet size={25}/>
                    {/* <p className='text-sm'>Notifications</p> */}
                </NavLink>

                <NavLink to={'/notifications'}
                    className={({isActive}) =>
                    isActive
                    ? "text-white p-2 bg-yellow-500 flex flex-col items-center rounded-lg"
                    : "text-gray-400 flex flex-col items-center p-2"}>
                    <HiBell size={25}/>
                    {/* <p className='text-sm'>Notifications</p> */}
                </NavLink>
                {notificationCount !== 0 &&
                    <p className='py-1 px-2 rounded-full bg-red-500 absolute text-xs text-white md:bottom-0 md:right-4 mb-7 right-5'>{notificationCount}</p>
                }
            </nav>
        :
            <div 
                className='fixed z-50 right-3 top-3 md:p-3 p-2 bg-yellow-500 rounded-lg cursor-pointer'
                onClick={() => setNaveOpened(true)}>
                <HiMenu size={23} color='white'/>
                {!notification && <FaCircle color='#e11515' size={10} className='absolute top-2 rigth-1'/>}
            </div>
    }
    </>
  )
}

export default Navigation
