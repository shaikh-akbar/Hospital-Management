import React,{useContext,useEffect} from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import AddNewAdmin from './components/AddNewAdmin'
import AddNewDoctor from './components/AddNewDoctor'
import Message from './components/Message'
import Doctor from './components/Doctor'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios'
import { Context } from './main'
import './App.css'
import Sidebar from './components/Sidebar'

const App = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } =
  useContext(Context);

useEffect(() => {
  const fetchUser = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/user/admin/me",
        {
          withCredentials: true,
        }
      );
      setIsAuthenticated(true);
      setUser(response.data.user);
    } catch (error) {
      setIsAuthenticated(false);
      setUser({});
    }
  };
  fetchUser();
}, [isAuthenticated]);
  return (
    <>
    <Router>
    <Sidebar />
      <Routes>
        <Route path='/' element={<Dashboard/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/doctor/addnew' element={<AddNewDoctor/>}></Route>
        <Route path='/admin/addnew' element={<AddNewAdmin/>}></Route>
        <Route path='/messages' element={<Message/>}></Route>
        <Route path='/doctors' element={<Doctor/>}></Route>
      </Routes>
      <ToastContainer position='top-center' />
    </Router>
    </>
  )
}

export default App