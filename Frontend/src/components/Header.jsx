import React from "react";
import Logo from "./Logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faBars, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import {NavLink,Link} from 'react-router-dom'
import { useState } from "react";

function Header(){
    // Responsive Header with hamburger menu for small/medium screens
    const [menuOpen, setMenuOpen] = useState(false);
    const [Search,setSearch] = useState(false);

    return (
        <header className="w-full bg-white shadow-sm">
            <div className="flex items-center justify-between font-medium py-4 px-2 md:px-6">
                {/* Logo */}
                <div className="h-10 flex items-center">
                    <Link to="/">
                        <Logo className="h-10 w-auto" />
                    </Link>
                </div>

                {/* Centered Search Section for medium and up */}
                <div className="flex-1 justify-center mx-2 sm:flex hidden ">
                    <div className="flex items-center gap-2 w-full max-w-md">
                        <input
                            type="search"
                            className="bg-gray-100 p-2 rounded focus:border focus:border-gray-800 focus:outline-none w-full"
                            placeholder="Search..."
                        />
                        <button className="bg-gray-800 text-white px-4 py-2 rounded">
                            Search
                        </button>
                    </div>
                </div>

                { (
                    <div className="flex-1 justify-center mx-2 flex mb-1 sm:hidden">
                        <div className="flex items-center gap-2 w-70 max-w-md">
                            <input
                                type="search"
                                className="bg-gray-100 p-2 rounded focus:border focus:border-gray-800 focus:outline-none w-full h-8"
                                placeholder="Search..."
                            />
                            <button className="bg-gray-800 text-white px-4 py-1 rounded h-8">
                                Search
                            </button>
                        </div>
                    </div>
                )}

                {/* Search icon for small screens */}
                {/* <div className="flex items-center sm:hidden mr-2">
                    <button
                        onClick={() => setSearch(!Search)}
                        aria-label="Open search"
                        className="focus:outline-none"
                    >
                        <FontAwesomeIcon icon={faMagnifyingGlass} className="h-6 w-6 ml-96" />
                    </button>
                </div> */}



                <div className="flex items-center sm:hidden">
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
                    <NavLink className="flex flex-col items-center gap-1" to="/about">
                        <p className="text-base my-2 hover:text-gray-500">About</p>
                    </NavLink>
                    <NavLink className="flex flex-col items-center gap-1" to="/orders">
                        <p className="text-base my-2 hover:text-gray-500">Orders</p>
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
                        About
                    </NavLink>
                    <NavLink
                        to="/orders"
                        className="block py-2 text-gray-800 hover:text-gray-500"
                        onClick={() => setMenuOpen(false)}
                    >
                        Orders
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