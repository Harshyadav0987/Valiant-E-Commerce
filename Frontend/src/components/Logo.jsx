import React from "react";
import logo from "/matched_logo.png"

function Logo({className="h-28 w-28"}){
    return(
        <img 
            src={logo} 
            alt="logo image" 
            className={`object-contain ${className}`}
        />
    )
}

export default Logo;