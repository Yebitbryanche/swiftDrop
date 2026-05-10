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
        //console.log(response.data)
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
        //console.log(response.data)
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
      // console.log(response.data)
       return response
    }
    catch(error:any){
        console.error(error.response.data)
        throw error;
    }

}

// get Notifications

export const getAgentNotifications = async (id:string | undefined) => {
    try{
        const response = await apiClient.get(`/notification/${id}`)
       // console.log(response.data)
        return response
    }
    catch(error:any){
        console.error(error.response.data)
        throw error
    }
}


export const markNotificationAsRead = async (
  notificationId: string
) => {
    try{
        const response = apiClient.post(`/read/${notificationId}`);
        return response
    }
    catch(error:any){
        console.error(error.response.data)
        throw error
    } 
};

export const cancleRequest = async (delivery_id:string) => {
    try{
        const response = apiClient.post(`/${delivery_id}/decline`)
        return response
    }
    catch(error:any){
        console.error(error.response.data)
        throw error
    }
}

// toggle active status

export const toggleStatus = async (user_id:string | undefined) => {
    try{
        const response = apiClient.patch(`/${user_id}/toggle-status`)
        return response
    }
    catch(error:any){
        console.error(error.response.data)
    }
}


export const uploadAvatar = async (
  userId: string | undefined,
  image: File
) => {

  const formData = new FormData();

  formData.append("file", image);

  return apiClient.post(
    `upload_avatar/${userId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};