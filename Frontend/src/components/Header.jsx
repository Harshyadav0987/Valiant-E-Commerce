import React from "react";
import Logo from "./Logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import {NavLink} from 'react-router-dom'

function Header(){
    return (
        <div className="flex items-center justify-between font-medium py-4 mx-2">
            <div className="h-10 flex items-center">
                <NavLink to="Home">  <Logo className="h-10 w-auto" /></NavLink>
            </div>


            {/* Centered Search Section */}
            <div className="flex-1 flex justify-center">
                <div className="flex items-center gap-2">
                    <input type="search" className="bg-gray-100 p-2 rounded focus:border focus:border-gray-800 focus:outline-none" placeholder="Search..." />
                    <button className="bg-gray-800 text-white px-4 py-2 rounded">Search</button>
                </div>
            </div>


            {/*  */}

            <ul  to="/"className="hidden sm:flex gap-5 text-sm text-gray-800">
                <NavLink className="flex flex-col items-center gap-1">
                    <p className="text-base my-2 ">About</p>
                </NavLink>

                {/* <NavLink className="flex flex-col items-center gap-1">
                    <p className="text-base mt-2">Become a Vendor</p>
                </NavLink> */}

                <NavLink className="flex flex-col items-center gap-1">
                    <p className="text-base my-2">Orders</p>
                </NavLink>

                <NavLink to="/cart" className="flex flex-col items-center gap-1">
                    <FontAwesomeIcon icon={faShoppingCart} className="h-10 w-10" />
                </NavLink>

                <NavLink to="/login" className=" flex flex-col items-center gap-1 rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-800 hover:text-gray-100" href="#">
                    <p className="text-base">Login</p>
                </NavLink>

                <NavLink to="/signup" className=" flex flex-col items-center gap-1 rounded-md bg-gray-800 px-5 py-2.5 text-sm font-medium text-gray-100 shadow-sm hover:bg-gray-100 hover:text-gray-800" href="#">
                    <p className="text-base">SignUp</p>
                </NavLink>

            </ul>
           
            

        </div>
    )
}

export default Header;