import React, { useState } from 'react' 
import { useAuth } from '../store/auth'
import { toast } from 'react-toastify'


const Dashboard = () => {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [seoTitle, setSeoTitle] = useState("")
  const {currentUser} = useAuth();

  const handleGenerate = async()=>{
    const response = await fetch('http://localhost:3000/api/blogs', {
        method: 'POST',
        headers:{
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({title, content})
    })
    if(response.ok) {
        const data = await response.json();
        console.log(data)
        setSeoTitle(data.seoTitle); 
    }  
  }

  const handleCopy = (text)=>{
     navigator.clipboard.writeText(text);
      toast.success('Text copied to cliboard !!!', {
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

  return (
   <>
     <div className='dashboard-container'>
        <h1>{currentUser && `Welcome to the website : ${currentUser.username}`}</h1>
        <h1 className='main-heading'>Blog DashBoard : </h1>
        <div>
            <label htmlFor="title">Title : </label>
            < input type="text"
                value = {title}
                onChange = {(e)=> setTitle(e.target.value)}
            />  
            <button className='copy-btn' onClick={()=> handleCopy(title)}>Copy</button>
        </div>
         <div className='content-container'>
            <label htmlFor="content">Content : </label>
            <textarea name="" id=""
                value = {content}
                onChange = {(e)=> setContent(e.target.value)}
            />  
            <button className='copy-btn' onClick={()=> handleCopy(content)}>Copy</button>
         </div>
         <button onClick = {handleGenerate} className='btn'>Generate SEO title</button>
        { seoTitle && <div className='ai-title'> <h1>Suggested Title : &nbsp; </h1> <p>{seoTitle}</p></div> }
     </div>
   </>
  )
}

export default Dashboard