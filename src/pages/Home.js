import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Dashboard from './Dashboard'
import Navbar from './Navbar'

function Home() {
    let navigate=useNavigate()
    function fetchData() {
        if (!localStorage.getItem("myapptoken")) {
            navigate("/");
        }
    }
    useEffect(() => {
        fetchData()
    },[])
  return (
   <>
   <Navbar/>
   <Dashboard/>
   </>
  )
}

export default Home