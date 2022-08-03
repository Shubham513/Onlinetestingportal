import React from 'react'
import {useEffect,useState} from 'react'
import {useNavigate} from 'react-router-dom'
import jwt from "jsonwebtoken"
import {useLocation} from 'react-router-dom'

function Interface() {

    const loc = useLocation();

    const [count,setCount] = useState(0);

    const y=loc.state.name;

    const navigate = useNavigate();

    useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (token) {
      const data = jwt.decode(token);
      if (!data.email) {
        localStorage.removeItem("token");
        navigate("/Signin");
      }
      else{
        if(count>1){
          navigate("/practice");
        }
        const role = data.role;

        console.log(role);
        if(role==="student"){
            setCount(count+1);
            navigate("/Exam",{state:{name:y}});
        }
        else{
            setCount(count+1);
            navigate("/Admincust",{state:{name:y}});
        }
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
    <div>Hey</div>
  )
}

export default Interface