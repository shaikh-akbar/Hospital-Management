import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Context } from '../main'
import { Link } from "react-router-dom"
import axios from 'axios'
import { toast } from "react-toastify"
import { Navigate } from "react-router-dom";



const Login = () => {

  const { isAuthenticated, setIsAuthenticated } = useContext(Context)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const navigate = useNavigate()

  const handleLogIn = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('https://hospital-management-backend-nu.vercel.app/api/user/patient/login',
        {email,password,confirmPassword,role:'Admin'},
        {
        withCredentials:true,
        headers:{
          "Content-Type":"application/json"
        }
      })
      toast.success(response.data.message)
      setIsAuthenticated(true)
      setEmail("")
      setPassword("")
      setConfirmPassword("")
      navigate('/')
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }
  return (
    <>
      <div className="container form-component login-form">
        <h2>Sign In</h2>
        <p>Please Login To Continue</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat culpa
          voluptas expedita itaque ex, totam ad quod error?
        </p>
        <form onSubmit={handleLogIn}>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <div
            style={{
              gap: "10px",
              justifyContent: "flex-end",
              flexDirection: "row",
            }}
          >
            <p style={{ marginBottom: 0 }}>Not Registered?</p>
            <Link
              to={"/register"}
              style={{ textDecoration: "none", color: "#271776ca" }}
            >
              Register Now
            </Link>
          </div>
          <div style={{ justifyContent: "center", alignItems: "center" }}>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Login