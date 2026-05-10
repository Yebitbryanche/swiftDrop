import UploadProfile from "../../Components/Design/Upload_AvatarComponent"
import { useAuth } from "../../hooks/AuthHook"

const Upload_Avatar = () => {
    const {user} = useAuth()
  return (
    <div>
      <UploadProfile userId={user?.id}/>
    </div>
  )
}

export default Upload_Avatar
