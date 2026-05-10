import { useState } from 'react'
import UserProfileCard from '../../Components/Design/UserProfileComponent'
import { useAuth } from '../../hooks/AuthHook'
import { toggleStatus } from '../../Components/Design/requests'
import Loader from '../../Components/UI/loader/Loader'

const Profile = () => {
    const {user, fetchuser} = useAuth()
    const [loading, setLoading] = useState(false)
    const handleToggleStatus = async () => {
        try{
            setLoading(true)
            const response = await toggleStatus(user?.id)
             console.log(response)
             fetchuser()
        }
        catch(error:any){
            console.error(error.message)
        }
        finally{
            setLoading(false)
        }
    }
  return (
    <div>
      <UserProfileCard
      user={user}
      onToggleStatus={handleToggleStatus}
      loading={loading}/>
      {loading && <Loader/>}
    </div>
  )
}

export default Profile
