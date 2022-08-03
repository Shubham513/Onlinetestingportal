import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Insertnew = () => {

  const loc = useLocation();

  const y=loc.state.name;

  const [general,setGeneral] = useState({
        category:y,
        question:"",
        option0:"",
        option1:"",
        option2:"",
        option3:"",
        answer:0
    });


    let name, value;
    const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;

    setGeneral({ ...general, [name]: value });
  }

    const Postdata = async (e) => {
        e.preventDefault();
    
        const { category,question, option0,option1,option2,option3,answer } = general;

        if(answer==1 || answer==4 || answer==3 || answer==2){
        }
        else{
          window.alert("Value should be between 1 and 4");
          return;
        }

        if(question==="" || option0==="" || option1==="" || option2==="" || option3===""){
          window.alert("Input can not be empty");
          return;
        }
        const res = await fetch("/insert", {
          method: "POST",
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
          window.alert("Saved Document Successfully");
          setGeneral({question:""});
          setGeneral({option0:""});
          setGeneral({option1:""});
          setGeneral({option2:""});
          setGeneral({option3:""});
          setGeneral({answer:0});
        }    
      }

	return (
      <>
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
                  value={general.question}
                  name="question"
                  id="question"
                  autoComplete='off'
                  onChange={handleInputs}
                />
              </div>
              <div className="mb-3">
                <label className='sameline'>Option1</label>
                <input
                  type="text"
                  className="form-control custom"
                  placeholder="Enter option1"
                  autoComplete="off"
                  value={general.option0}
                  name="option0"
                  id="option0"
                  onChange={handleInputs}
                />
              </div>
              <div className="mb-3">
                <label className='sameline'>Option2</label>
                <input
                  type="text"
                  className="form-control custom"
                  placeholder="Enter option2"
                  autoComplete="off"
                  value={general.option1}
                  name="option1"
                  id="option1"
                  onChange={handleInputs}
                />
              </div>
              <div className="mb-3">
                <label className='sameline'>Option3</label>
                <input
                  type="text"
                  className="form-control custom"
                  placeholder="Enter option3"
                  autoComplete="off"
                  value={general.option2}
                  name="option2"
                  id="option2"
                  onChange={handleInputs}
                />
              </div>
              <div className="mb-3">
                <label className='sameline'>Option4</label>
                <input
                  type="text"
                  className="form-control custom"
                  placeholder="Enter option4"
                  autoComplete="off"
                  value={general.option3}
                  name="option3"
                  id="option3"
                  onChange={handleInputs}
                />
              </div>
              <div className="mb-3">
                <label className='sameline'>Answer</label>
                <input
                  type="text"
                  className="form-control custom"
                  placeholder="Enter answer"
                  autoComplete="off"
                  value={general.answer}
                  name="answer"
                  id="answer"
                  onChange={handleInputs}
                />
              </div>
              
              </div>

              <div className='ii'>
                <div className='row'>
                <div className="col-md-4"></div>
                <div className="col-md-3">
              <div className="d-grid">
                <button type="submit" className="myButton" onClick={Postdata}>
                  Insert
                </button>
                </div>
              </div>
              </div>
              </div>
        </div>
        </>
	);
}

export default Insertnew;