import { createContext, use, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export const ValiantContext = createContext();
import axios from "axios";


const ValiantContextProvider = (props)=>{
    
    const currency = import.meta.env.VITE_CURRENCY;
    const deliveryFee = 99;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [search,setSearch] =useState('');
    const [ShowSearch,setShowSearch] = useState(false);
    const [cartItems,setCartItems] =useState({});
    const navigate = useNavigate();
    const [products,setProducts] = useState([]);

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

    const getCartCount= ()=>{
        let totalCount = 0;

        for(const items in cartItems){
            for(const item in cartItems[items]){
                totalCount+=cartItems[items][item];
            }
        }

        return totalCount;
    }

    const updateQuantity = async (itemId,size,quantity)=>{
        let cartData = structuredClone(cartItems );
        
        cartData[itemId][size]=quantity;

        setCartItems(cartData);
    }

    // Calculate total price
    const getCartAmount = () => {
        let totalAmount = 0
        for (const items in cartItems) {
            const itemInfo = products.find((product) => product._id === items)
            if (itemInfo) {
                for(const item in cartItems[items]){
                totalAmount += itemInfo.price * cartItems[items][item]
                }
            }
        }
        return totalAmount
    }

    const fetchProducts = async()=>{
        try{
            const response = await axios.get(`${backendUrl}/api/product/list`);
        if(response.data.success){
            setProducts(response.data.products);
        }else{
            toast.error("Error fetching products");
        }
        }catch(error){
            console.error("Error fetching products:", error);
            toast.error("Error fetching products");
        }

    }

    useEffect(()=>{
        fetchProducts();
    },[])

    const val ={
        products,currency,deliveryFee,search,setSearch,ShowSearch,setShowSearch,cartItems,addToCart,getCartCount,
        updateQuantity,getCartAmount,navigate,
    }

    return (
        <ValiantContext.Provider value={val}>
            {props.children }
        </ValiantContext.Provider>
    )
}

export default ValiantContextProvider;