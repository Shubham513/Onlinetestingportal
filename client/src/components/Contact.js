import React from 'react'
import { useEffect } from 'react';
import jwt from "jsonwebtoken";
import { useNavigate } from 'react-router-dom';

const Contact = () => {

  const navigate = useNavigate();

  useEffect(() => {
    
    const token = localStorage.getItem("token");
    console.log(token);
    if (token) {
      const data = jwt.decode(token);
      if (!data.email) {
        console.log("no");
        localStorage.removeItem("token");
        navigate("/Signin");
      }
      if (Date.now() > jwt.decode(token).exp * 1000) {
        localStorage.removeItem("token");
        navigate("/Signin");
      }
    } else {
      localStorage.removeItem("token");
      navigate("/Signin");
    }
  }, []);


  return (
    <div>Contact</div>
  )
}

export default Contact