import React from 'react'
import {NavLink} from 'react-router-dom'
function Header() {
  return (
    <div className = "bg-black text-white p-5 space-x-10">
      <NavLink to = "/">Home</NavLink>
      <NavLink to = "/todo">Todo</NavLink>
    </div>
  )
}

export default Header
