import React from 'react'
import {Route} from 'react-router-dom'
import {Routes} from 'react-router-dom'
import Navbar from "./components/Navbar"
import Home from "./components/Home"
import About from "./components/About"
import Contact from "./components/Contact"
import Signin from "./components/Signin"
import Register from "./components/Signup"
import Practice from "./components/Practice"
import Exam from "./components/Exam"
import Insertnew from "./components/Insertnew"
import Withoutnav from './Withoutnav'
import Withnav from './Withnav'
import Update from './components/Update'
import Delete from './components/Delete'
import Interface from './components/Interface'
import Admincust from './components/Admincust'
import Logout from './components/Logout'

const App = () => {
  return (
    <>
    <Routes>  
    <Route element={<Withnav/>}>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/signup" element={<Register />} />
    <Route path="practice" element={<Practice/>}/>
    <Route path="/admincust" element={<Admincust/>}></Route>
    <Route path='/logout' element={<Logout/>}></Route>
    </Route>
    <Route element={<Withoutnav/>}>
    <Route path="exam" element={<Exam/>}/>
    <Route path="insertnew" element={<Insertnew/>}></Route>
    <Route path="/signin" element={<Signin />} />
    <Route path="update" element={<Update/>}></Route>
    <Route path="delete" element={<Delete/>}></Route>
    <Route path="/interface" element={<Interface/>}></Route>
    </Route>
    </Routes>
    </>

  )
}

export default App