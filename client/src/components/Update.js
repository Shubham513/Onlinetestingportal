import React, { useState,useEffect } from 'react';
import Loader from 'react-loader';
import { Location, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Update = () => {

    const [quiz, setQuiz] = useState({
        req:[]
      });

    const navigate = useNavigate();
    
    const loc = useLocation();

    const y=loc.state.name;

    const [loading, setLoading] = useState(true);

    const [limit,setLimit] = useState(0);

    const [question,setques] = useState("");

    const [option0,setOption0] = useState("");

    const [option1,setOption1] = useState("");

    const [option2,setOption2] = useState("");

    const [option3,setOption3] = useState("");

    const [answer,setanswer] = useState("");

    const gonext =  () =>{
        if(i<limit-1)
        setIndex(i+1);
    }

    const goprevious = () =>{
        if(i>0)
        setIndex(i-1);
    }

    const setit = (e) =>{
        setLimit(e);
    }

    const [i, setIndex] = useState(0);


    useEffect(() => {
        setLoading(true);
        display();
      }, []);

    const display = async () =>{

        const res = await fetch("/collect/"+y,{
            method:"GET",
            headers: {
              "Content-Type": "application/json",
              "x-access-token": localStorage.getItem("token"),
            }
          });

          const data = await res.json();

          if(res.status===422 || data.length===0){
            window.alert("No questions available")
            navigate("/practice");
          }

          setQuiz({req:data});

          setit(data.length);

          setLoading(false);

        setques({question:data[i].question});
        setOption0({option0:data[i].option[0]});
        setOption1({option1:data[i].option[1]});
        setOption2({option2:data[i].option[2]});
        setOption3({option3:data[i].option[3]});
        setanswer({answer:data[i].answer});
    };

    useEffect(() =>{
        if(loading===false){
            setques({question:quiz.req[i].question});
            setOption0({option0:quiz.req[i].option[0]});
            setOption1({option1:quiz.req[i].option[1]});
            setOption2({option2:quiz.req[i].option[2]});
            setOption3({option3:quiz.req[i].option[3]});
            setanswer({answer:quiz.req[i].answer});
        }
    }, [i])

    let name, value;
    const handleInputq = (e) => {
        name = e.target.name;
        value = e.target.value;
        setques({name:value});
    }



    const handleInputo0 = (e) => {
        name = e.target.name;
        value = e.target.value;
        setOption0({name:value});
    }

    const handleInputo1 = (e) => {
        name = e.target.name;
        value = e.target.value;
        setOption1({name:value});
    }

    const handleInputo2 = (e) => {
        name = e.target.name;
        value = e.target.value;
        setOption2({name:value});
    }

    const handleInputo3 = (e) => {
        name = e.target.name;
        value = e.target.value;
        setOption3({name:value});
    }

    const handleInputa = (e) => {
        name = e.target.name;
        value = e.target.value;
        setanswer({answer:value});
    }


    const update = async (e) =>{

        let category= quiz.req[i].category;
        let question=document.getElementById('question').value;
        let option0=document.getElementById('option0').value;
        let option1=document.getElementById('option1').value;
        let option2=document.getElementById('option2').value;
        let option3=document.getElementById('option3').value;
        let answer=document.getElementById('answer').value;

        if(answer==1 || answer==4 || answer==3 || answer==2){
        }
        else{
          window.alert("Value should be between 1 and 4");
          setanswer({answer:0});
          return;
        }

        if(question==="" || option0==="" || option1==="" || option2==="" || option3===""){
          window.alert("Input can not be empty");
          return;
        }

        const res = await fetch("/update/"+quiz.req[i]._id+"?_method=PUT",{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem("token"),
              },
              body: JSON.stringify({
                category,question,option0,option1,option2,option3,answer
              })
        });

        const data = await res.json();
    
        if (res.status === 422 || !data) {
          window.alert("Invalid credentials");
        }
        else {
          window.alert("Updated Document Successfully");
        } 

        display();
    }

	return (
        <>
        {loading ? (
            <Loader
            className="loader"
            type="Grid"
            color="#fff"
            height={100}
            width={100}
          />
          ) : (
              <div className="demmo">
              <div className="header">
                  <h1 className='h11'>{y}</h1>
              </div>
              <div className='qbody'>
              <div className="mb-3">
                <label className='sameline'>Question</label>
                <input
                  type="text"
                  className="form-control custom"
                  placeholder="Enter question"
                  value={question.question}
                  name="question"
                  id="question"
                  autoComplete='off'
                  onChange={handleInputq}
                />
              </div>
              <div className="mb-3">
                <label className='sameline'>Option1</label>
                <input
                  type="text"
                  className="form-control custom"
                  placeholder="Enter option1"
                  autoComplete="off"
                  value={option0.option0}
                  name="option0"
                  id="option0"
                  onChange={handleInputo0}
                />
              </div>
              <div className="mb-3">
                <label className='sameline'>Option2</label>
                <input
                  type="text"
                  className="form-control custom"
                  placeholder="Enter option2"
                  autoComplete="off"
                  value={option1.option1}
                  name="option1"
                  id="option1"
                  onChange={handleInputo1}
                />
              </div>
              <div className="mb-3">
                <label className='sameline'>Option3</label>
                <input
                  type="text"
                  className="form-control custom"
                  placeholder="Enter option3"
                  autoComplete="off"
                  value={option2.option2}
                  name="option2"
                  id="option2"
                  onChange={handleInputo2}
                />
              </div>
              <div className="mb-3">
                <label className='sameline'>Option4</label>
                <input
                  type="text"
                  className="form-control custom"
                  placeholder="Enter option4"
                  autoComplete="off"
                  value={option3.option3}
                  name="option3"
                  id="option3"
                  onChange={handleInputo3}
                />
              </div>
              <div className="mb-3">
                <label className='sameline'>Answer</label>
                <input
                  type="text"
                  className="form-control custom"
                  placeholder="Enter answer"
                  autoComplete="off"
                  value={answer.answer}
                  name="answer"
                  id="answer"
                  onChange={handleInputa}
                />
              </div>
              <div className="qbut">
              <div className="row">
              <div className="d-grid col-md-3">
                <button type="submit" className="myButton" onClick={goprevious}>
                  Previous
                </button>
              </div>
              <div className='col-md-1'></div>
              <div className="d-grid col-md-3">
                <button type="submit" className="myButton" onClick={update}>
                  Update
                </button>
              </div>
              <div className='col-md-1'></div>
              <div className="d-grid col-md-3">
                <button type="submit" className="myButton" onClick={gonext}>
                  Next
                </button>
              </div>
              <div className="placed">
              <p>Question {i+1} out of {limit}</p>
            </div>
              </div>
              </div>
              </div>
        </div>
          )}
          </>
  
    )
}

export default Update;