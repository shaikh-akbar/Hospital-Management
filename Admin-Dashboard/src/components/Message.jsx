import React,{ useState,useContext,useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { Context } from '../main'
import axios from 'axios'

const Message = () => {
  const [messages,setMessages] = useState([])
  const {isAuthenticated} = useContext(Context)

  useEffect(()=>{
    const fetchMessages = async () => {
      try {
        const { data } = await axios.get('https://hospital-management-backend-nu.vercel.app/api/user/message/admin/getAllMessages',{withCredentials:true})
        setMessages(data.messages)
      } catch (error) {
        console.log('ERROR OCCURED WHILE FETCHING',error)
      }
    }
    fetchMessages()
  },[])
  if(!isAuthenticated){
    return <Navigate to={'/login'} />
  }
  return (
    <>
     <section className="page messages">
      <h1>MESSAGE</h1>
      <div className="banner">
        {messages && messages?.length > 0 ? (
          messages.map((element) => {
            return (
              <div className="card" key={element._id}>
                <div className="details">
                  <p>
                    First Name: <span>{element.firstName}</span>
                  </p>
                  <p>
                    Last Name: <span>{element.lastName}</span>
                  </p>
                  <p>
                    Email: <span>{element.email}</span>
                  </p>
                  <p>
                    Phone: <span>{element.phone}</span>
                  </p>
                  <p>
                    Message: <span>{element.message}</span>
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <h1>No Messages!</h1>
        )}
      </div>
    </section>
    </>
  )
}

export default Message