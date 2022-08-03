import React from 'react'
import { useState } from 'react'
import '../App.css'
import { useNavigate } from 'react-router-dom'

const Signin = () => {

  const navigate = useNavigate();

  let url = "/sign-in";

  const [user, setUser] = useState({
    email: "", password: ""
  });


  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  }

  const setStudent = async(e) => {
    url='/sign-in';
  }

  const setAdmin = async(e) => {
    url='/sign-inad';
  }

  const Postdata = async (e) => {
    e.preventDefault();

    const { email, password } = user;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email, password
      })
    });


    const data = await res.json();

    if (res.status === 422 || !data) {
      window.alert("Invalid credentials");
    }
    else {
      window.alert("Signin Successful");
      localStorage.setItem("token", data.token);
      const token = localStorage.getItem("token");
      if(token){
        console.log("yeah");
      }
      navigate("/");
    }
  }

  return (
    <>
    <div className="Signin">
      <div className="demo2">
        <h1 className='h1'>Login</h1>
      <div className="modal-body row">
        <div class="col-md-7">
          <form method="POST">
            <div className='demo1'>
              <div className="mb-3">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control input-box"
                  placeholder="Enter email"
                  autoComplete="off"
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
                  autoComplete="off"
                  value={user.password}
                  name="password"
                  onChange={handleInputs}
                />
              </div>
              <div className="d-grid">
                <button type="submit" className="btn btn-primary bn" onClick={Postdata}>
                  Sign-in
                </button>
              </div>
            </div>
          </form>
        </div>
        <div class="col-md-5">
          <div className='option'>
            <h2 className="h2">Login As</h2>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary bn" onClick={setStudent}>
                Student
              </button>
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary bn" onClick={setAdmin}>
                Admin
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

export default Signin