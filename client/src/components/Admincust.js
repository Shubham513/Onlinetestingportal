import React from 'react'
import {useNavigate} from 'react-router-dom'
import {useLocation} from 'react-router-dom'
import {NavLink} from 'react-router-dom'

function Admincust() {

  const loc = useLocation();

  const y=loc.state.name;

  const navigate = useNavigate();

  const handle = (e) =>{
        let want = e.target.name;

        navigate("/"+want,{state:{name:y}});
  } 

  return (
    <>
    <div className="demo3">
        <h1 className='h22'>Admin Access</h1>
        <div className="req">
        
        <button name="Insertnew" className='adButton' onClick={handle}>
            Insert
        </button>

        <button name="update" className='adButton' onClick={handle}>
            Update
        </button>
    
        <button name="delete" className='adButton' onClick={handle}>
            Delete
        </button>
        </div>
        <div>
        <NavLink to="/practice"></NavLink>
        </div>
    </div>
    </>
  )
}

export default Admincust