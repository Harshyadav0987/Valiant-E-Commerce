import React, { useContext } from "react";
import Logo from "./Logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faBars, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import {NavLink,Link} from 'react-router-dom'
import { useState } from "react";
import { ValiantContext } from "../context/ValiantContext";

function Header(){
    // Responsive Header with hamburger menu for small/medium screens
    const [menuOpen, setMenuOpen] = useState(false);
    const {Search,setSearch,ShowSearch,setShowSearch} = useContext(ValiantContext)
    

    return (
        <header className="w-full bg-white shadow-sm">
            <div className="flex items-center justify-between font-medium py-4 px-2 md:px-6">
                {/* Logo */}
                <div className="h-10 flex items-center">
                    <Link to="/">
                        <Logo className="h-10 w-auto" />
                    </Link>
                </div>
                
                <nav className="hidden sm:flex gap-4 items-center text-sm text-gray-800">
                    <NavLink className="flex flex-col items-center gap-1" to="/">
                        <p className="text-base my-2 hover:text-gray-500">HOME</p>
                    </NavLink>
                    <NavLink className="flex flex-col items-center gap-1" to="/collection">
                        <p className="text-base my-2 hover:text-gray-500">COLLECTIONS</p>
                    </NavLink>
                    <NavLink className="flex flex-col items-center gap-1" to="/about">
                        <p className="text-base my-2 hover:text-gray-500">ABOUT</p>
                    </NavLink>
                    <NavLink className="flex flex-col items-center gap-1" to="/contact">
                        <p className="text-base my-2 hover:text-gray-500">CONTACT</p>
                    </NavLink>
                </nav>

                <div className="flex items-center sm:hidden">
                    <NavLink className="flex flex-col items-center gap-1 mr-3 mb-1" to="" onClick={()=>setShowSearch(!ShowSearch)}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} className="text-base my-2 hover:text-gray-500 text-gray-800 size-5 " />
                    </NavLink>
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Open menu"
                        className="focus:outline-none"
                    >
                        <FontAwesomeIcon icon={faBars} className="h-6 w-6" />
                    </button>
                </div>

                {/* Navigation links for medium and larger screens */}
                <nav className="hidden sm:flex gap-4 items-center text-sm text-gray-800">
                     {/* <NavLink className="flex flex-col items-center gap-1 " to="" onClick={()=>setShowSearch(!ShowSearch)}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} className="text-base my-2 hover:text-gray-500 text-gray-800 size-5 " />
                    </NavLink> */}

                     <NavLink className="flex flex-col items-center gap-1" to="" onClick={()=>setShowSearch(!ShowSearch)}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} className="text-base my-2 hover:text-gray-500 text-gray-800 size-5 " />
                    </NavLink>

                    <NavLink to="/cart" className="flex flex-col items-center gap-1 hover:text-gray-500">
                        <FontAwesomeIcon icon={faShoppingCart} className="h-7 w-7" />
                    </NavLink>
                    <NavLink
                        to="/login"
                        className="flex flex-col items-center gap-1 rounded-md bg-gray-800 px-4 py-2 text-sm font-medium text-gray-100 shadow-sm hover:bg-gray-100 hover:text-gray-800"
                    >
                        <p className="text-base">Login</p>
                    </NavLink>
                    <NavLink
                        to="/signup"
                        className="flex flex-col items-center gap-1 rounded-md bg-gray-800 px-4 py-2 text-sm font-medium text-gray-100 shadow-sm hover:bg-gray-100 hover:text-gray-800"
                    >
                        <p className="text-base">SignUp</p>
                    </NavLink>
                </nav>
                
            </div>

            {/* Mobile menu */}
            {menuOpen && (
                <div className="sm:hidden bg-white shadow-md px-4 py-3 space-y-2">
                    <NavLink
                        to="/about"
                        className="block py-2 text-gray-800 hover:text-gray-500"
                        onClick={() => setMenuOpen(false)}
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/orders"
                        className="block py-2 text-gray-800 hover:text-gray-500"
                        onClick={() => setMenuOpen(false)}
                    >
                        Collection
                    </NavLink>
                    <NavLink
                        to="/cart"
                        className="block py-2 text-gray-800 hover:text-gray-500"
                        onClick={() => setMenuOpen(false)}
                    >
                        <FontAwesomeIcon icon={faShoppingCart} className="h-6 w-6 mr-2" />
                        Cart
                    </NavLink>
                    <NavLink
                        to="/login"
                        className="block py-2 rounded-md bg-gray-800 text-gray-100 hover:bg-gray-100 hover:text-gray-800"
                        onClick={() => setMenuOpen(false)}
                    >
                        Login
                    </NavLink>
                    <NavLink
                        to="/signup"
                        className="block py-2 rounded-md bg-gray-800 text-gray-100 hover:bg-gray-100 hover:text-gray-800"
                        onClick={() => setMenuOpen(false)}
                    >
                        SignUp
                    </NavLink>
                </div>
            )}

        </header>
    );
}

export default Header;