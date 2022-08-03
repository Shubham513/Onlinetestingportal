import React from 'react'
import { NavLink } from 'react-router-dom'
import '../App.css'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import jwt from 'jsonwebtoken'

const Physics = () => {

  const navigate = useNavigate();

  const handless = (e) => {
    let ssub = e.target.name;

    navigate('/Interface',{state:{name:ssub}});
  }

  return (
    <>
    <div className="Physics">
      <div className="second">
          <div className="row">
            <div className="col-md-4">
              <div className="contain">
              <div>
              <img src={require("../Images/photo1.jpeg")} className="image-sec"></img>
              </div>
              <div>
                <h3>Mechanics</h3>
              </div>
              <div className="button-sec">
              <button name="Mechanics" onClick={handless} className="btn btn-primary bn" >
                  Start Now
              </button>
              </div>
              </div>
            </div>

            <div className="col-md-4">
            <div className="contain">
            <div>
              <img src={require("../Images/photo2.jpg")} className="image-sec"></img>
              </div>
              <div>
                <h3>Fluid Dynamics</h3>
              </div>
              <div className="button-sec">
              <button name="Fluid Dynamics" onClick={handless} className="btn btn-primary bn" >
                  Start Now
              </button>
              </div>
              </div>
            </div>

            <div className="col-md-4">
            <div className="contain">
            <div>
              <img src={require("../Images/photo1.jpeg")} className="image-sec"></img>
              </div>
              <div>
                <h3>Surface Tension</h3>
              </div>
              <div className="button-sec">
              <button name="Surface Tension" onClick={handless} className="btn btn-primary bn" >
                  Start Now
              </button>
              </div>
            </div>
            </div>

            <div className="col-md-4">
            <div className="contain">
              <div>
                <img src={require("../Images/photo1.jpeg")} className="image-sec"></img>
              </div>
              <div>
                <h3>Thermodynamics</h3>
              </div>
              <div className="button-sec">
              <button name="Thermodynamics" onClick={handless} className="btn btn-primary bn" >
                  Start Now
              </button>
              </div>
            </div>
            </div>

            <div className="col-md-4">
            <div className="contain">
              <div>
                <img src={require("../Images/photo1.jpeg")} className="image-sec"></img>
              </div>
              <div>
                <h3>Electricity</h3>
              </div>
              <div className="button-sec">
              <button name="Electricity" onClick={handless} className="btn btn-primary bn" >
                  Start Now
              </button>
              </div>
            </div>
            </div>

            <div className="col-md-4">
            <div className="contain">
            <div>
              <img src={require("../Images/photo1.jpeg")} className="image-sec"></img>
              </div>
              <div>
                <h3>Electromagnetism</h3>
              </div>
              <div className="button-sec">
              <button name="Electromagnetism" onClick={handless} className="btn btn-primary bn" >
                  Start Now
              </button>
              </div>
            </div>
            </div>

          </div>
        </div>
    </div>
    </>
  )
}

export default Physics