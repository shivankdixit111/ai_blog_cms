import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();
  const {storeTokenInLS} = useAuth();
  const [user, setUser] = useState({ 
      email: "",
      password: "", 
  });

  const handleInput = async(e)=>{
      const {name, value} = e.target;
      setUser({...user, [name]: value})
  }
  const handleSubmit = async(e)=>{
     e.preventDefault();
     const response = await fetch('http://localhost:3000/api/user/login', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
     })
    
     const data = await response.json();
     console.log('data ', data)
    //  console.log('user ', user) 
     user.email = "",
     user.password = "", 
     setUser({...user})
     storeTokenInLS(data.token)

     if(response.ok) { 
        toast.success('Login successful !!!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark", 
        });
        navigate('/')
     } else { 
        toast.error(`${data.message}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark", 
        });
     }
  }

  return (
     <>
       <div className="auth-container">
           <h1>Login here </h1>
          <form onSubmit={handleSubmit}> 
            <label htmlFor="email">Email  &nbsp; &nbsp; &nbsp;</label>
            <input 
                type="email"
                value = {user.email}
                name = "email"
                onChange={handleInput}
            /> <br />
            <label htmlFor="password">Password </label>
                <input 
                type="text" 
                value = {user.password}
                name="password"
                onChange={handleInput}
            /> <br />  
                <button >Submit</button>
          </form>
       </div>
     </>
  )
}

export default Login