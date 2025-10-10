import React from "react";
import logo from "/valiant_new_logo_final_cropped.png";

function Logo({className="h-100"}){
    return(
        <img 
            src={logo} 
            alt="logo image" 
            className={`object-contain ${className}`}
        />
    )
}

export default Logo;