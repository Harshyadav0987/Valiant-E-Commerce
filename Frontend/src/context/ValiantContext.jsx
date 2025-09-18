import { createContext } from "react";
import {products} from '../assets/assets.js'
export const ValiantContext = createContext();

const ValiantContextProvider = (props)=>{
    
    const currency = "₹"
    const deliveryFee = 99;
    const val ={
        products,currency,deliveryFee
    }

    return (
        <ValiantContext.Provider value={val}>
            {props.children }
        </ValiantContext.Provider>
    )
}

export default ValiantContextProvider;