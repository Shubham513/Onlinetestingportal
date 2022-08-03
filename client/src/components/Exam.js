import React, { useState ,useEffect} from 'react';
import Loader from 'react-loader';
import { Location, Navigate, useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Exam = () => {

    const navigate = useNavigate();

    const loc = useLocation();

    const y=loc.state.name;

    const [quiz, setQuiz] = useState({
        req:[]
      });

    const [arr,setarr] = useState([]);

    const [vis,setvis] = useState([]);

    const [i, setIndex] = useState(0);
    
    const [limit,setLimit] = useState(0);

    let selectedoption = 0;

    const [myscore,setMyscore] = useState(0);

    const [show,setShow] = useState(1);

    const [total,setTotal] = useState(0);

    const [loading, setLoading] = useState(true);

    const [answered,setAnswered] = useState(0);

    const [visited,setVisited] = useState(1);

    useEffect(() => {
        setLoading(true);
        display();
        vis[i]=1;
      }, []); 

    useEffect(() =>{
        if(vis[i]===0){
            vis[i]=1;
            setVisited(visited+1);
        }
    }, [i])

    const display = async () =>{

        const res = await fetch("/collect/"+y,{
            method:"GET",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem("token"),
              },
          });

          const data = await res.json();

          if(res.status===422 || data.length===0){
            window.alert("No questions available")
            navigate("/practice");
          }
          setQuiz({req:data});

          setit(data.length);

          setLoading(false);
    };

    const gonext = () =>{
        if(i<limit-1)
        setIndex(i+1);
    }

    const goprevious = () =>{
        if(i>0)
        setIndex(i-1);
    }

    const setit = (e) =>{
        for(var j=0;j<e;++j){
            setarr(oldArray => [...oldArray, 0]);
            setvis(oldArray => [...oldArray, 0]);
        }

        setLimit(e);
        setTotal(4*e);
    }

    const evaluatescore = async () =>{

        if(document.getElementById('flex1').checked){
            selectedoption=1;
        }
        else if(document.getElementById('flex2').checked){
            selectedoption=2;
        }
        else if(document.getElementById('flex3').checked){
            selectedoption=3;
        }
        else if(document.getElementById('flex4').checked){
            selectedoption=4;
        }

        if(selectedoption===0){
            return
        }

        if(arr[i]===0){
            setAnswered(answered+1);
        }

        arr[i]=selectedoption;

        selectedoption=0;

        gonext();
    }


    const onSubmit = () =>{
        let score = 0;
        for(var k=0;k<quiz.req.length;++k){
            console.log(arr[k]+"value"+quiz.req[k].answer)
            if(arr[k] === quiz.req[k].answer){
                score+=1;
            }
        }
        setMyscore(4*score);
        setShow(0);
    };

    const calculateTimeLeft = () => {
        let year = new Date().getFullYear();
        let month = new Date().getMonth();
        let day = new Date().getDay();
        const difference = +new Date(`${year}-10-1`) - +new Date();
        let timeLeft = {};
    
        if (difference > 0) {
          timeLeft = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
          };
        }
    
        return timeLeft;
      };
    
      const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
      const [year] = useState(new Date().getFullYear());
    
      useEffect(() => {
        setTimeout(() => {
          setTimeLeft(calculateTimeLeft());
        }, 1000);
      });
    
      const timerComponents = [];
    
      Object.keys(timeLeft).forEach((interval) => {
        if (!timeLeft[interval]) {
          return;
        }
    
        timerComponents.push(
          <span>
            {timeLeft[interval]} {interval}{" "}
          </span>
        );
      });




	return (
        <div>
        {loading ? (
        <Loader
        className="loader"
        type="Grid"
        color="#fff"
        height={100}
        width={100}
      />
      ) : (
            <>
            {show ? (
            <>
            <div className="modal-body row">
            <div className='col-md-8'>
                <div>
                    <div className="align">

                    <h2 className="qnum">Question {i+1} of {limit}</h2>
                    
                    <h2 className="question">{quiz.req[i].question}</h2>
                    
                    <div className="options">

                    <div className="form-check ops">
                        <input className="form-check-input ops" type="radio" name="student" id="flex1"/>
                            <label className="form-check-label chosen" for="flexRadioDefault1">
                                <><h5>{quiz.req[i].option[0]}</h5></>
                            </label>
                    </div> 

                    <div className="form-check ops">
                        <input className="form-check-input ops" type="radio" name="student" id="flex2"/>
                            <label className="form-check-label chosen" for="flexRadioDefault2">
                                <><h5>{quiz.req[i].option[1]}</h5></>
                            </label>
                    </div>

                    <div className="form-check ops">
                        <input className="form-check-input ops" type="radio" name="student" id="flex3"/>
                            <label className="form-check-label chosen" for="flexRadioDefault2">
                                <><h5>{quiz.req[i].option[2]}</h5></>
                            </label>
                    </div>

                    <div className="form-check ops">
                        <input className="form-check-input ops" type="radio" name="student" id="flex4"/>
                            <label className="form-check-label chosen" for="flexRadioDefault4">
                                <><h5>{quiz.req[i].option[3]}</h5></>
                            </label>
                    </div>
                </div>
                </div>
                </div>
            </div>
            
            <div className="col-md-3">
                <div className="side-bar">
                    <h2 className="qnum">Time Status</h2>
                    <>{timerComponents}</>
                    <h2 className="qnum">Summary</h2>
                    <div className="row">
                        <span className="col-md-3 answered"><h3>{answered}</h3></span>
                        <h4 className="col-md-7 question">Answered</h4>
                    </div>

                    <div className="row">
                        <span className="col-md-3 unmarked"><h3>{limit-answered}</h3></span>
                        <h4 className="col-md-7 question">Unanswered</h4>
                    </div>

                    <div className='row'>
                        <span className="col-md-3 unanswered"><h3>{visited}</h3></span>
                        <h4 className="col-md-7 question">Visited</h4>
                    </div>

                    <div className="row">
                        <span className="col-md-3 marked"><h3>{limit-visited}</h3></span>
                        <h4 className="col-md-7 question">Not Visited</h4>
                    </div>
                </div>
            </div>
            <div className="full">
            <div className="row">
                <div className='col-md-3'>
                    <button className="myutton" onClick={evaluatescore}>Save and next</button>
                </div>
                <div className='col-md-3'>
                    <button className="myutton" onClick={goprevious}>Previous</button>
                </div>
                <div className='col-md-3'>
                    <button className="myutton" onClick={gonext}>Next</button>
                </div>
                <div className='col-md-3'>
                    <button className="myutton" onClick={onSubmit}>Submit</button>
                </div>
            </div>
            </div>
            </div>
            </>
            ):(
                <div className='demo3'>
                <div className="pad"> 
                <h1 className="h1">You got {myscore} out of {total}</h1>
                </div>
                <div className="pad">
                <NavLink to='/' className='myButton'>
                    Go to Home page
                </NavLink>
                </div>
                </div>
            )}
            
            </>
      )};
        </div>
	);
}

export default Exam;