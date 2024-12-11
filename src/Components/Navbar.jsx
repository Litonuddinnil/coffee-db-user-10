import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

const Navbar = () => {
  const {user,logOut} = useContext(AuthContext);
    const links =
    <>
    <li><NavLink to={"/"}>Home</NavLink></li>
    <li><NavLink to={"/addCoffee"}>Add Coffee </NavLink></li>
     
    
    </>
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">daisyUI</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {links}
        </ul>
      </div>
      <div className="navbar-end">
      <div className="flex items-center justify-end gap-2 pr-6">
        <button className="btn btn-success">
          <Link to="/singUp">Sing Up</Link>
        </button>
        <span>|</span>
        <button className={`btn ${user?.email ? "btn-warning" : "btn-error"}`}>
          {user?.email ? (
            <button onClick={logOut}>Log Out</button>
          ) : (
            <Link to="/singIn">Login</Link>
          )}
        </button>
      </div>
      </div>
    </div>
  );
};

export default Navbar;
