import React, { useEffect } from 'react'

function Logout() {

  useEffect(() =>{
    localStorage.removeItem("token");
  },[])

  return (
    <div>
      <p className='pt-5'>Thanks for visiting</p>
      </div>
  )
}

export default Logout