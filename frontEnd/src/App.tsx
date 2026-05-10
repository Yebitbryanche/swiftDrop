import { Routes, Route } from "react-router-dom"
import Notifications from "./Pages/Common/Notifications"
import FAQ from "./Pages/Common/FAQ"
import Home from "./Pages/Common/Home"
import Navigation from "./Containers/Navigation"
import OrderHistory from "./Pages/Common/OrderHistory"
import RegisterPage from "./Pages/Auth/Register"
import LoginPage from "./Pages/Auth/Login"
import AgentDetailPage from "./Pages/Others/AgentProfile"
import CreateDelivery from "./Pages/Others/CreateDelivery"
import Profile from "./Pages/Common/profile"
import Upload_Avatar from "./Pages/Others/Upload_avatarPage"


function App() {
  return (
    <div>
      <Navigation/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/faq" element={<FAQ/>}/>
          <Route path="/orderhistory" element={<OrderHistory/>}/>
          <Route path="/notifications" element={<Notifications/>}/>
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/agent" element={<AgentDetailPage/>}/>
          <Route path="/create_delivery/:agent_id" element={<CreateDelivery/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/upload_avatar" element={<Upload_Avatar/>}/>

        </Routes>
    </div>
  )
}

export default App
