import React from 'react'
import { NavLink } from 'react-router-dom'
import '../App.css'
import { useNavigate } from 'react-router-dom'

const Algebra = () => {

  const navigate = useNavigate();

  const handle = (e) => {
    let ssub = e.target.name;

    navigate('/Interface',{state:{name:ssub}});
  }

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
                <h3>Set Theory</h3>
              </div>
              <div className="button-sec">
              <button  name="Set theory" onClick={handle} className="btn btn-primary bn" >
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
                <h3>Substitution Method</h3>
              </div>
              <div className="button-sec">
              <button name="Substitution Method" onClick={handle}  className="btn btn-primary bn" >
                  Start Now
              </button>
              </div>
              </div>
            </div>

            <div className="col-md-4">
            <div className="contain">
            <div>
              <img src={require("../Images/photo1.jpeg")}  className="image-sec"></img>
              </div>
              <div>
                <h3>Solving Inequalities</h3>
              </div>
              <div className="button-sec">
              <button name="Solving Inequalities" onClick={handle} className="btn btn-primary bn" >
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
                <h3>System of Equations</h3>
              </div>
              <div className="button-sec">
              <button name="System of Equations"onClick={handle} className="btn btn-primary bn" >
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

export default Algebra