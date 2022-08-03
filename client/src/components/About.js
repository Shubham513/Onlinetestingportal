import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt from "jsonwebtoken";

const About = () => {

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
    
    
    <div className='About'>
      <>
        <h2>About Us</h2>
        <p>
          This website helps students practice questions in an easy way and build their career. These days online study mode has become a new normal. The platform has 
          potential to become a new way to learn and creative things. Detailed explanations help students better understand
          concepts. 
        </p>
      </>
    </div>
  )
}

export default About