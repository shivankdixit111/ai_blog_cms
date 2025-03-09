import React, { useEffect, useState } from 'react'
import { useAuth } from '../store/auth'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const LogOut = () => {
  const {LogOutUser} = useAuth();
  const [hasLoggedOut, setHasLoggedOut] = useState(false);

  useEffect(() => {
    LogOutUser();
    if(!hasLoggedOut) {
        setHasLoggedOut(true);
        toast.success('LogOut successful !!!', {
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
  }, [!hasLoggedOut])

  const navigate  = useNavigate();
 
   
  navigate("/")
  return (
     <></>
  )
}

export default LogOut