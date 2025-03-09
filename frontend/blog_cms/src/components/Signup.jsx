import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify';

const Signup = () => {
  const navigate = useNavigate();
  const {storeTokenInLS} = useAuth();

  const [user, setUser] = useState({
      username: "",
      email: "",
      password: "",
      phoneNo: "",
  });

  const handleInput = async(e)=>{
      const {name, value} = e.target;
      setUser({...user, [name]: value})
  }
  const handleSubmit = async(e)=>{
     e.preventDefault();
     const response = await fetch('http://localhost:3000/api/user/register', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
     })
     const data = await response.json();
     console.log('data ', data)
    //  console.log('token ', data.token)
    //  console.log('user ', user)
     user.username = "",
     user.email = "",
     user.password = "",
     user.phoneNo = ""
     setUser({...user})
     storeTokenInLS(data.token)

    //  console.log('authorization token ', authorizationToken)

     if(response.ok) {
         toast.success('SignUp successful !!!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark", 
        });
         navigate('/login')
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
          <h1>Register here </h1>
          <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">Username </label>
                <input 
                    type="text" 
                    value = {user.username}
                    name="username"
                    onChange={handleInput}
                /> 
            </div>
            <div>
                <label htmlFor="email">Email &nbsp; &nbsp; &nbsp; </label>
                <input 
                    type="email"
                    value = {user.email}
                    name = "email"
                    onChange={handleInput}
                />  
            </div>
            <div>
                <label htmlFor="password">Password </label>
                <input 
                    type="text" 
                    value = {user.password}
                    name="password"
                    onChange={handleInput}
                />  
            </div>
            <div>
                <label htmlFor="phoneNo">PhoneNo </label>
                    <input 
                    type="text" 
                    value = {user.phoneNo}
                    name="phoneNo"
                    onChange={handleInput}
                /> 
            </div> 
                <button >Submit</button>
          </form>
       </div>
     </>
  )
}

export default Signup