import { createContext, useState, useEffect } from "react";
import type { NotificationTypes } from "../types/userTypes";
import { getAgentNotifications } from "../Components/Design/requests";
import { useToast } from "./toastContext";
import { useAuth } from "../hooks/AuthHook";

type NotificationContextType = {
    notification:NotificationTypes[]
    notificationCount:number
    loading:boolean
    fetchNotifications:() => Promise<void>
}

export const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export const NotificationProvider = ({children}:any) =>{
    const [notification, setNotification] = useState<NotificationTypes[]>([])
    const [loading, setLoading] = useState(false)
    const {showToast} = useToast()
    const {user} = useAuth()

  const fetchNotifications = async () => {
    try{
      setLoading(true)
      const response = await getAgentNotifications(user?.id)
      setNotification(response.data.data)
    }
    catch(error:any){
      console.error(error)
      showToast({
        type:"error",
        title:'Error',
        message:error.response.data.detail
      })
    }
    finally{
      setLoading(false)
    }
  }

  useEffect(() =>{
    if(user?.id){
      fetchNotifications()
    }
  },[user?.id])

  let notificationCount = notification.filter((notification) => notification.unread).length;

  return(
    <NotificationContext.Provider value={{notification, notificationCount, fetchNotifications, loading}}>
        {children}
    </NotificationContext.Provider>
  )
}