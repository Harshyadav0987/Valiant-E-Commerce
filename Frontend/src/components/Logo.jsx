import React from "react";
import logo from "/logo2.png"

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