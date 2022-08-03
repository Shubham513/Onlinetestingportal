import React from 'react'
import { NavLink } from 'react-router-dom'
import '../App.css'

const Geometry = () => {
  return (
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
              <NavLink  name="Mechanics" to="/exam" className="btn btn-primary bn" >
                  Start Now
              </NavLink>
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
              <button to="/" className="btn btn-primary bn" >
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
              <button to="/" className="btn btn-primary bn" >
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
              <button to="/" className="btn btn-primary bn" >
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
              <button to="/" className="btn btn-primary bn" >
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
              <button to="/" className="btn btn-primary bn" >
                  Start Now
              </button>
              </div>
            </div>
            </div>

          </div>
        </div>
    </div>
  )
}

export default Geometry