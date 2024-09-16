import React from 'react'

function Navbar() {
  return (
    <nav className="flex justify-between bg-violet-900 text-white py-3">
      <div className="logo">
        <span className="font-bold text-xl mx-9">TodoList</span>
      </div>
      <ul className="flex gap-8 mx-9">
        <li className="cursor-pointer hover:font-bold transition-ease-in duration-75">
          Home
        </li>
        <li className="cursor-pointer hover:font-bold transition-ease-in duration-75 ">
          Your Tasks
        </li>
      </ul>
    </nav>
  );
}

export default Navbar
