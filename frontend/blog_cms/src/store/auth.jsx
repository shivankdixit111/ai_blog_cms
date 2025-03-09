import { createContext, useContext, useEffect, useState } from "react"; 

export const AuthContext = createContext();

export const AuthProvider = ({children})=>{ 
    const [token, setToken] = useState("");
    const [currentUser, setCurrentUser] = useState("")
    const authorizationToken = `Bearer ${token}`
    const [isLoggedIn, setIsLoggedIn] = useState(Boolean(token));

    useEffect(()=>{
       setIsLoggedIn(Boolean(token));
    },[token])

    const storeTokenInLS = (serverToken)=>{
        setToken(serverToken)
        localStorage.setItem("token", serverToken);  
    } 

    const LogOutUser = ()=>{
        localStorage.removeItem("token")
        setToken("");
        console.log('Logging out the user')
    }

    const getCurrentUser = async()=>{
        const response = await fetch('http://localhost:3000/api/user', {
            method: "GET",
            headers: {
                'Authorization': authorizationToken
            }
        })
        const data = await response.json();
        console.log('current User --> ', data.user)
        setCurrentUser(data.user);
    }

    useEffect(()=>{
        getCurrentUser();
    }, [token])


    return (
        <AuthContext.Provider value={{storeTokenInLS, authorizationToken, LogOutUser, currentUser, isLoggedIn}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = ()=>{
    const authContextValue = useContext(AuthContext);
    if(!authContextValue) {
        throw new Error('useAuth used outside of the Provider');
    }
    return authContextValue;
}
  
  