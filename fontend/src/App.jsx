import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import RechargeCard from './pages/payMent/rechargeCard/RechargeCard.jsx'
import PaymentSuccess from './pages/payMent/paymentSuccess/PaymentSuccess.jsx'
import AdminDashBoard from './pages/admin/adminDashBoard/AdminDashBoard.jsx'
import UserDashBoard from './pages/user/userDashBoard/userDashBoard.jsx'
import DescriptionBook from './pages/user/descriptionBook/DescriptionBook.jsx'
import UploadDocument from './pages/admin/upload/Upload.jsx'

function App() {

  let location = useLocation()
  let navigate = useNavigate()

  useEffect(() => {

    const fetchData = async () => {

      try {
        let responseUserData = await axios.post(import.meta.env.VITE_BACKEND_URL + "/auth/getInforUser", {}, { withCredentials: true })
        let userData = responseUserData.data.userData
        localStorage.setItem("userData", JSON.stringify(userData))
        navigate(location.pathname)


      } catch (error) {

        try {
          let responseNewAt = await axios.post(import.meta.env.VITE_BACKEND_URL + "/getNewAccessToken", {}, { withCredentials: true })
          let responseUserData = await axios.post(import.meta.env.VITE_BACKEND_URL + "/auth/getInforUser", {}, { withCredentials: true })
          let userData = responseUserData.data
          localStorage.setItem("at", responseNewAt.data.at)
          localStorage.setItem("userData", JSON.stringify(userData))
          if (!userData?.isAdmin) {
            navigate("/dashBoard")
          } else {
            navigate("/admin/DashBoard")
          }

        } catch (error) {
          console.log(error);
          localStorage.removeItem("userData")
          navigate("/login")
        }
      }
    }


    fetchData()

  }, [])


  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="/" element={<h1> home page </h1>} />
        <Route path='/dashBoard' element={<UserDashBoard />} />
        <Route path='/payMent' element={<RechargeCard />} />
        <Route path='/paymentSuccess' element={<PaymentSuccess />} />
        <Route path='/admin/DashBoard' element={<AdminDashBoard />} />
        <Route path='/desBook' element={<DescriptionBook />} />
        <Route path='admin/upload' element={<UploadDocument />} />
      </Routes>
    </>
  )
}

export default App
