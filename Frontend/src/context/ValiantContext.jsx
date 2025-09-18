import { createContext } from "react";

export const ValiantContext = createContext();

const ValiantContextProvider = (props)=>{
    
    const currency = "₹"
    const deliveryFee = 99;
    const value ={
        currency,deliveryFee
    }

    return (
        <ValiantContext.Provider>
            {props.children }
        </ValiantContext.Provider>
    )
    

}

export default ValiantContextProvider;