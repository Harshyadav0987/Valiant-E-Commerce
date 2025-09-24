import { createContext, use, useEffect, useState } from "react";
import {products} from '../assets/assets.js'
import { toast } from "react-toastify";
export const ValiantContext = createContext();

const ValiantContextProvider = (props)=>{
    
    const currency = "$"
    const deliveryFee = 99;
    const [search,setSearch] =useState('');
    const [ShowSearch,setShowSearch] = useState(false);
    const [cartItems,setCartItems] =useState({});

    const addToCart =(itemId,size)=>{

        if(!size){
            toast.error("select product size");
            return;
        }

        const cartData = structuredClone(cartItems);

        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size]+=1;
            }
            else{
                cartData[itemId][size]=1;
            }
        }
        else{
            cartData[itemId] ={};
            cartData[itemId][size]=1;
        }

        setCartItems(cartData)
    }

    useEffect(()=>{
        console.log(cartItems);
    },[cartItems])


    const val ={
        products,currency,deliveryFee,search,setSearch,ShowSearch,setShowSearch,cartItems,addToCart
    }

    return (
        <ValiantContext.Provider value={val}>
            {props.children }
        </ValiantContext.Provider>
    )
}

export default ValiantContextProvider;