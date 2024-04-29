import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
const Layout = ({user, dark, setDark}) => {
  return (
    <>
      <Navbar user={user} dark={dark} setDark={setDark}/>
      <Outlet/>
      <Footer/>
    </>
  )
}
export default Layout