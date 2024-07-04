import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from "react-router-dom"
import axios from 'axios'
import { toast } from "react-toastify"
import { Navigate } from "react-router-dom";
import { Context } from '../main'

const Login = () => {
    const { isAuthenticated, setIsAuthenticated } = useContext(Context)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:4000/api/user/login',
                { email, password, confirmPassword, role: 'Admin' },
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json"
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
            <section className="container form-component">
                <img src="/logo1.png" alt="logo" className="logo" style={{width:"120px",height:"110px"}}/>
                <h1 className="form-title">WELCOME TO AL-AKBAR</h1>
                <p>Only Admins Are Allowed To Access These Resources!</p>
                <form onSubmit={handleLogin}>
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
                    <div style={{ justifyContent: "center", alignItems: "center" }}>
                        <button type="submit">Login</button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Login