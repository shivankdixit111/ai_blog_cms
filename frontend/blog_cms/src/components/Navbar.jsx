import React, { useState } from 'react' 
import {NavLink} from 'react-router-dom'
import { useAuth } from '../store/auth';
import { FaTimes, FaBars } from "react-icons/fa";

const Navbar = () => { 
  const {isLoggedIn} = useAuth();
  const [isMobile, setIsMobile] = useState(false);
  return (
    <>
      <div className="navbar-container"> 
              <span className="hamburger" onClick={()=> setIsMobile(!isMobile)}>
                  {isMobile ? <FaBars/> :  <FaTimes/>}
               </span>
             <nav className={isMobile ? 'nav-links' : 'nav-links active'}>
                    <div className='home'>
                        <NavLink to={'/'}  className='nav-link'> Home </NavLink> 
                    </div>
                    { isLoggedIn ? 
                        <div className='nav-auth'>
                        <NavLink to={'/logout'} className='nav-link'> Logout </NavLink>  
                        </div> 
                    : 
                    <div className='nav-auth'>
                        <NavLink to={'/signup'} className='nav-link'> SignUp </NavLink> 
                        <NavLink to={'/login'} className='nav-link'> Login </NavLink>  
                    </div>
                     } 
              </nav> 
      </div>
    </> 
  )
}

export default Navbar