import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom';
import '/node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../App.css'

const Signup = () => {

  const history = useNavigate();

  const [user,setUser] = useState({
    email:"",password:"",fname:"",lname:""
  });

  let name,value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;

    setUser({...user , [name]:value});
  }
  const Postdata = async(e) => {
      e.preventDefault();

      const {email,password,fname,lname}=user;

      if(email==="" || password==="" || fname==="" || lname===""){
        window.alert("Fill in all fields");
        return;
      }
        const res = await fetch("/register",{
          method:"POST",
          headers : {
            "Content-Type" : "application/json"
          },
          body:JSON.stringify({
              email,password,fname,lname
          })
        });
        const data = await res.json();

      console.log(data);

      if(res.status === 422 || !data){
        window.alert("Username already taken");
      }
      else{
        window.alert("Registration Successful");

        history('/Signin');
      }
    }
  return (
    <>
    <div className='Register'>
    <form method="POST">
    <div className="demo">
    <h2 className='h2'>Register</h2>
    <div className="mb-3">
      <label>First Name</label>
      <input
        type="name"
        className="form-control input-box"
        placeholder="Enter email"
        autoComplete = "off"
        value={user.fname}
        name="fname"
        onChange={handleInputs}
      />
    </div>
    <div className="mb-3">
      <label>Last Name</label>
      <input
        type="name"
        className="form-control input-box"
        placeholder="Enter email"
        autoComplete = "off"
        value={user.lname}
        name="lname"
        onChange={handleInputs}
      />
    </div>
    <div className="mb-3">
      <label>Email address</label>
      <input
        type="email"
        className="form-control input-box"
        placeholder="Enter email"
        autoComplete = "off"
        value={user.email}
        name="email"
        onChange={handleInputs}
      />
    </div>
    <div className="mb-3">
      <label>Password</label>
      <input
        type="password"
        className="form-control input-box"
        placeholder="Enter password"
        autoComplete = "off"
        value={user.password}
        name="password"
        onChange={handleInputs}
      />
    </div>
    <div className='reqq'>
    <div className="d-grid">
      <button type="submit" className="btn btn-primary bn" onClick={Postdata}>
        Sign Up
      </button>
    </div>
    </div>
    <p className="forgot-password text-right fo">
      Already registered <a href="/signin">sign in?</a>
    </p>
    </div>
  </form>
  </div>
  </>
  )
}

export default Signup