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