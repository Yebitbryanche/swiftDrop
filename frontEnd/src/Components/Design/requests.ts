import apiClient from "../../apiClient";

// create account
export const createAccount = async (
    full_name:string,
    phone:string,
    email:string,
    password:string,
    role:string,
    office_location:string,
    delivery_fee:number,
    working_hours:string,
    vehicle_type:string
) => {
    try{
        const response = await apiClient.post('/create/user',{
            full_name,
            phone,
            email,
            password,
            role,
            office_location,
            delivery_fee,
            working_hours,
            vehicle_type
        })
        console.log(response.data)
        return (response.data)
    }
    catch(error:any){
        console.error(error.response.data)
        throw error
    }
}

/// login request

export const loginRequest = async (email:string,password:string) => {
    try{
        const response = await apiClient.post('/login',{
            email,
            password
        })
        console.log(response.data)
        return response
    }
    catch(error:any){
        console.error(error.response.data)
        throw error
    }
}


// place Order

export const place_orderRequest =  async (
    agent_id:string | undefined,
    user_id:string | undefined,
    pickup_location:string,
    delivery_location:string,
    item_type:string
) => {
    try{
       const response = await apiClient.post(`/place_order/${agent_id}/${user_id}`,{
        pickup_location,
        delivery_location,
        item_type
       })
       console.log(response.data)
       return response
    }
    catch(error:any){
        console.error(error.response.data)
        throw error;
    }

}