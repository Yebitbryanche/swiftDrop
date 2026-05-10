export interface UserTypes{
    id:string
    user_name:string
    phone:string
    email:string
    status:boolean
    role:string
    office_location:string
    delivery_fee:number
    working_hours:string
    vehicle:string
    profile_url:string
    created_at:string
    rating:number
}

export type AgentType ={
    agent:UserTypes
    average_rating:number
}


export type NotificationType = "Delivery" | "success" | "alert" | "general";

export type NotificationTypes = {
    id:string
    title:string
    type:NotificationType
    message:string
    created_at:string
    unread:boolean
    delivery_id:string
}