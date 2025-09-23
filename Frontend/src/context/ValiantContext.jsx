import { createContext, useState } from "react";
import {products} from '../assets/assets.js'
export const ValiantContext = createContext();

const ValiantContextProvider = (props)=>{
    
    const currency = "$"
    const deliveryFee = 99;
    const [search,setSearch] =useState('');
    const [ShowSearch,setShowSearch] = useState(false);

    const val ={
        products,currency,deliveryFee,search,setSearch,ShowSearch,setShowSearch
    }

    return (
        <ValiantContext.Provider value={val}>
            {props.children }
        </ValiantContext.Provider>
    )
}

export default ValiantContextProvider;