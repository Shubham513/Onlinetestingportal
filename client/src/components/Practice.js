import React,{useState} from 'react'
import '../App.css'
import Physics from './Physics'
import Algebra from './Algebra'
import Chemistry from './Chemistry'
import Geometry from './Geometry'
import Biology from './Biology'
import { useNavigate } from 'react-router-dom'
import jwt from "jsonwebtoken";
import { useEffect } from 'react'

const Practice = () => {

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

  const [sub,setSub]=useState("physics");

  const handleit = (e) =>{
    /*console.log(ssub);*/
    setSub(e.target.name);
  }

  const rend = () =>{
    if(sub==="physics"){
      return <Physics/>
    }
    else if(sub==="algebra"){ 
      return <Algebra/>
    }
    else if(sub==='chemistry'){
      return <Chemistry/>
    }
    else if(sub==="geometry"){
      return <Geometry/>
    }
    else{
      return <Biology/>
    }
  }

  return (
    <>
      <div className="modal-body row">
        <div class="col-md-3 col-sm-1">
          <div className='practice'>
            <div className="d-grid">
            <button name="physics" onClick={handleit} className="myButton " >
                Physics
              </button>
            </div>
            <div className="d-grid">
            <button name="algebra" onClick={handleit} className="myButton" >
                Algebra
            </button>
            </div>
            <div className="d-grid">
            <button name="chemistry" onClick={handleit} className="myButton" >
                Chemistry
            </button>
            </div>
            <div className="d-grid">
            <button name="geometry" onClick={handleit}className="myButton" >
                Geometry
            </button>
            </div>
            <div className="d-grid">
            <button name="biology" onClick={handleit} className="myButton" >
                Biology
            </button>
            </div>
          </div>
        </div>
        <div className="col-md-1"></div>
        <div className="col-md-8">
          {rend()}
        </div>
        </div>
      
    </>
  )
}

export default Practice