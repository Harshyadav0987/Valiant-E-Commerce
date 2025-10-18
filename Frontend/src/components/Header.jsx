// import React, { useContext } from "react";
// import Logo from "./Logo";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faShoppingCart, faBars, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
// import {NavLink,Link} from 'react-router-dom'
// import { useState } from "react";
// import { ValiantContext } from "../context/ValiantContext";

// function Header(){
//     // Responsive Header with hamburger menu for small/medium screens
//     const [menuOpen, setMenuOpen] = useState(false);
//     const {Search,setSearch,ShowSearch,setShowSearch,getCartCount,token,setToken} = useContext(ValiantContext)
    
//     const handleLogout =()=>{
//         setToken(""),
//         localStorage.removeItem("valiantToken")
//         window.location.reload();
//     };

//     return (
//         <header className="w-full bg-white shadow-sm">
//             <div className="flex items-center justify-between font-medium py-4 px-2 md:px-6">
//                 {/* Logo */}
//                 <div className="h-10 flex items-center">
//                     <Link to="/">
//                         <Logo className="h-12 w-auto" />
//                     </Link>
//                 </div>
                
//                 <nav className="hidden sm:flex gap-4 items-center text-sm text-gray-800">
//                     <NavLink className="flex flex-col items-center gap-1 " to="/">
//                         <p className="text-base my-2 hover:text-gray-500">HOME</p>
//                     </NavLink>
//                     <NavLink className="flex flex-col items-center gap-1" to="/collection">
//                         <p className="text-base my-2 hover:text-gray-500">COLLECTIONS</p>
//                     </NavLink>
//                     <NavLink className="flex flex-col items-center gap-1" to="/orders">
//                         <p className="text-base my-2 hover:text-gray-500">ORDERS</p>
//                     </NavLink>
//                     <NavLink className="flex flex-col items-center gap-1" to="/about">
//                         <p className="text-base my-2 hover:text-gray-500">ABOUT</p>
//                     </NavLink>
//                     <NavLink className="flex flex-col items-center gap-1" to="/contact">
//                         <p className="text-base my-2 hover:text-gray-500">CONTACT</p>
//                     </NavLink>
//                 </nav>


//                 <div className="flex items-center sm:hidden">
//                     {/* Search bar */}
//                     <NavLink className="flex flex-col items-center gap-1 mr-3 mb-1" onClick={()=>setShowSearch(!ShowSearch)}>
//                         <FontAwesomeIcon icon={faMagnifyingGlass} className="text-base my-2 hover:text-gray-500 text-gray-800 size-5 " />
//                     </NavLink>
//                     <button
//                         onClick={() => setMenuOpen(!menuOpen)}
//                         aria-label="Open menu"
//                         className="focus:outline-none"
//                     >
//                         <FontAwesomeIcon icon={faBars} className="h-6 w-6" />
//                     </button>
//                 </div>

//                 {/* Navigation links for medium and larger screens */}
//                 <nav className="hidden sm:flex gap-4 items-center text-sm text-gray-800">
//                      {/* <NavLink className="flex flex-col items-center gap-1 " to="" onClick={()=>setShowSearch(!ShowSearch)}>
//                         <FontAwesomeIcon icon={faMagnifyingGlass} className="text-base my-2 hover:text-gray-500 text-gray-800 size-5 " />
//                     </NavLink> */}

//                     <button
//                         type="button"
//                         onClick={() => setShowSearch(!ShowSearch)}
//                         className="flex flex-col items-center gap-1 "
//                         >
//                         <FontAwesomeIcon
//                             icon={faMagnifyingGlass}
//                             className="text-base my-2  transition-all duration-300 transform hover:-translate-y-0.5 text-gray-800 size-5"
//                         />
//                     </button>


//                     <NavLink to="/cart" className="relative flex items-center justify-center  transition-all duration-300 transform hover:-translate-y-0.5">
//                         <FontAwesomeIcon icon={faShoppingCart} className="h-7 w-7" />

//                         {/* Minimal classy badge */}
//                         <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-gray-800 text-white text-[0.65rem] font-semibold rounded-full h-4 w-4 flex items-center justify-center shadow-md">
//                             {getCartCount()}
//                         </span>
//                     </NavLink>


//                     {!token?
//                     <NavLink
//                         to="/signup"
//                         className="flex flex-col items-center gap-1 rounded-md bg-gray-800 px-4 py-2 text-sm font-medium text-gray-100 hover:bg-gray-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
//                         // className="w-full md:w-auto px-12 py-4 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5" 

//                     >
//                         <p className="text-base">Login/SignUp</p>
//                     </NavLink> :
//                     <div className='flex items-center gap-4'>
//                         {/* Logout Button */}
//                         <button 
//                             className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-red-500 to-red-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:from-red-600 hover:to-red-700 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
//                             onClick={()=>handleLogout()}  
//                         >
//                             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
//                             </svg>
//                             <span>Logout</span>
//                         </button>
//                     </div>
//                     }
//                 </nav>
                
//             </div>

//             {/* Mobile menu */}
//             {menuOpen && (
//                 <div className="sm:hidden bg-white shadow-md px-4 py-3 space-y-2">
//                     <NavLink
//                         to="/"
//                         className="block py-2 text-gray-800 hover:text-gray-500"
//                         onClick={() => setMenuOpen(false)}
//                     >
//                         Home
//                     </NavLink>
//                     <NavLink
//                         to="/collection"
//                         className="block py-2 text-gray-800 hover:text-gray-500"
//                         onClick={() => setMenuOpen(false)}
//                     >
//                         Collection
//                     </NavLink>
//                     <NavLink
//                         to="/cart"
//                         className="block py-2 text-gray-800 hover:text-gray-500"
//                         onClick={() => setMenuOpen(false)}
//                     >
//                         <FontAwesomeIcon icon={faShoppingCart} className="h-6 w-6 mr-2" />
//                         Cart
//                     </NavLink>
//                     <NavLink
//                         to="/login"
//                         className="block py-2 rounded-md bg-gray-800 text-gray-100 hover:bg-gray-100 hover:text-gray-800"
//                         onClick={() => setMenuOpen(false)}
//                     >
//                         Login
//                     </NavLink>
//                     <NavLink
//                         to="/signup"
//                         className="block py-2 rounded-md bg-gray-800 text-gray-100 hover:bg-gray-100 hover:text-gray-800"
//                         onClick={() => setMenuOpen(false)}
//                     >
//                         SignUp
//                     </NavLink>
//                 </div>
//             )}

//         </header>
//     );
// }

// export default Header;

import React, { useContext, useState } from "react";
import Logo from "./Logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faBars, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { NavLink, Link } from 'react-router-dom';
import { ValiantContext } from "../context/ValiantContext";

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { Search, setSearch, ShowSearch, setShowSearch, getCartCount, token, setToken } = useContext(ValiantContext);
    
    const handleLogout = () => {
        setToken("");
        localStorage.removeItem("valiantToken");
        window.location.reload();
    };

    return (
        <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="flex items-center justify-between py-5">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link to="/">
                            <Logo className="h-12 w-auto" />
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-8">
                        <NavLink to="/" className="text-sm tracking-wide text-gray-700 hover:text-gray-900 transition-colors">
                            HOME
                        </NavLink>
                        <NavLink to="/collection" className="text-sm tracking-wide text-gray-700 hover:text-gray-900 transition-colors">
                            COLLECTIONS
                        </NavLink>
                        <NavLink to="/orders" className="text-sm tracking-wide text-gray-700 hover:text-gray-900 transition-colors">
                            ORDERS
                        </NavLink>
                        <NavLink to="/about" className="text-sm tracking-wide text-gray-700 hover:text-gray-900 transition-colors">
                            ABOUT
                        </NavLink>
                        <NavLink to="/contact" className="text-sm tracking-wide text-gray-700 hover:text-gray-900 transition-colors">
                            CONTACT
                        </NavLink>
                    </nav>

                    {/* Desktop Actions */}
                    <div className="hidden lg:flex items-center gap-6">
                        <button
                            onClick={() => setShowSearch(!ShowSearch)}
                            className="text-gray-700 hover:text-gray-900 transition-colors"
                            aria-label="Search"
                        >
                            <FontAwesomeIcon icon={faMagnifyingGlass} className="h-5 w-5" />
                        </button>

                        <NavLink to="/cart" className="relative text-gray-700 hover:text-gray-900 transition-colors ">
                            <FontAwesomeIcon icon={faShoppingCart} className=" h-7 w-7" />
                            <span className="absolute -top-2 -right-2 bg-gray-900 text-white text-[10px] font-semibold rounded-full h-4 w-4 flex items-center justify-center">
                                {getCartCount()}
                            </span>
                        </NavLink>

                        {!token ? (
                            <NavLink
                                to="/signup"
                                className="px-6 py-2 bg-gray-900 text-white text-sm tracking-wide hover:bg-gray-800 transition-colors"
                            >
                                LOGIN
                            </NavLink>
                        ) : (
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 px-5 py-2 bg-gray-900 text-white text-sm tracking-wide hover:bg-gray-800 transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                LOGOUT
                            </button>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center gap-4 lg:hidden">
                        <button
                            onClick={() => setShowSearch(!ShowSearch)}
                            className="text-gray-700 hover:text-gray-900 transition-colors"
                            aria-label="Search"
                        >
                            <FontAwesomeIcon icon={faMagnifyingGlass} className="h-5 w-5" />
                        </button>

                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="text-gray-700 hover:text-gray-900 transition-colors"
                            aria-label="Menu"
                        >
                            <FontAwesomeIcon icon={faBars} className="h-6 w-6" />
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {menuOpen && (
                    <div className="lg:hidden border-t border-gray-200 py-4 space-y-1">
                        <NavLink
                            to="/"
                            className="block py-3 text-sm tracking-wide text-gray-700 hover:text-gray-900 transition-colors"
                            onClick={() => setMenuOpen(false)}
                        >
                            HOME
                        </NavLink>
                        <NavLink
                            to="/collection"
                            className="block py-3 text-sm tracking-wide text-gray-700 hover:text-gray-900 transition-colors"
                            onClick={() => setMenuOpen(false)}
                        >
                            COLLECTIONS
                        </NavLink>
                        <NavLink
                            to="/orders"
                            className="block py-3 text-sm tracking-wide text-gray-700 hover:text-gray-900 transition-colors"
                            onClick={() => setMenuOpen(false)}
                        >
                            ORDERS
                        </NavLink>
                        <NavLink
                            to="/about"
                            className="block py-3 text-sm tracking-wide text-gray-700 hover:text-gray-900 transition-colors"
                            onClick={() => setMenuOpen(false)}
                        >
                            ABOUT
                        </NavLink>
                        <NavLink
                            to="/contact"
                            className="block py-3 text-sm tracking-wide text-gray-700 hover:text-gray-900 transition-colors"
                            onClick={() => setMenuOpen(false)}
                        >
                            CONTACT
                        </NavLink>
                        <div className="pt-4 border-t border-gray-200 space-y-3">
                            <NavLink
                                to="/cart"
                                className="flex items-center justify-center gap-3 py-3 text-sm tracking-wide text-gray-700 hover:text-gray-900 transition-colors "
                                onClick={() => setMenuOpen(false)}
                            >
                                <FontAwesomeIcon icon={faShoppingCart} className="h-5 w-5" />
                                CART ({getCartCount()})
                            </NavLink>
                            {!token ? (
                                <NavLink
                                    to="/signup"
                                    className="block w-full py-3 text-center bg-gray-900 text-white text-sm tracking-wide hover:bg-gray-800 transition-colors"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    LOGIN / SIGNUP
                                </NavLink>
                            ) : (
                                <button
                                    onClick={() => {
                                        handleLogout();
                                        setMenuOpen(false);
                                    }}
                                    className="flex items-center justify-center gap-2 w-full py-3 bg-gray-900 text-white text-sm tracking-wide hover:bg-gray-800 transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                    LOGOUT
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}

export default Header;