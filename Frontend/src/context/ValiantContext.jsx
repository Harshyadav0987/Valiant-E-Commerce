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
    const [token,setToken]=useState(localStorage.getItem("valiantToken") || '');

    const addToCart =async (itemId,size)=>{
        if(!size){
            toast.error("select product size");
            return;
        }

        // const cartData = structuredClone(cartItems);

        // if(cartData[itemId]){
        //     if(cartData[itemId][size]){
        //         cartData[itemId][size]+=1;
        //     }
        //     else{
        //         cartData[itemId][size]=1;
        //     }
        // }
        // else{
        //     cartData[itemId] ={};
        //     cartData[itemId][size]=1;
        // }

        // setCartItems(cartData)

        if(token){
            console.log(token);
            try{
                await axios.post(`${backendUrl}/api/cart/add`,{itemId,size},{headers: {token}})
                getUserCart();
                toast.success("Item added to cart");
            }catch(error){
                console.error("Error adding to cart:", error);
                toast.error("Error adding to cart");
            }
        }
    }

    const getCartCount= ()=>{
        let totalCount = 0;

        for(const items in cartItems){
            for(const item in cartItems[items].sizes){
                totalCount+=cartItems[items].sizes[item];
            }
        }

        return totalCount;
    }

    const updateQuantity = async (itemId,size,quantity)=>{
        // let cartData = structuredClone(cartItems );
        
        // cartData[itemId][size]=quantity;

        // setCartItems(cartData);

        if(token){
            try{
                await axios.post(`${backendUrl}/api/cart/update`,{itemId,size,quantity},{headers: {token}});
                getUserCart();
            }catch(error){
                console.error("Error updating cart:", error);
                toast.error("Error updating cart");
            }
        }
    }

    const getUserCart = async()=>{
        if(token){
            try{    
                const response = await axios.get(`${backendUrl}/api/cart/get`,{headers: {token}});
                if(response.data.success){
                    setCartItems(response.data.cartData);
                }
            }catch(error){
                console.error("Error fetching cart data:", error);
                toast.error("Error fetching cart data");
            }       
        }
    }

    // Calculate total price
    const getCartAmount = () => {
        let totalAmount = 0
        for (const items in cartItems) {
            const itemInfo = products.find((product) => product._id === items)
            if (itemInfo) {
                for(const item in cartItems[items].sizes){
                totalAmount += itemInfo.price * cartItems[items].sizes[item]
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

    
    useEffect(()=>{
        if(!token && localStorage.getItem("valiantToken")){
            setToken(localStorage.getItem("valiantToken"));
        }

        if(token){
             getUserCart(token);
        }
    }, [token]);


    const val ={
        products,currency,deliveryFee,search,setSearch,ShowSearch,setShowSearch,cartItems,addToCart,getCartCount,
        updateQuantity,getCartAmount,navigate,token,setToken,backendUrl
    }

    return (
        <ValiantContext.Provider value={val}>
            {props.children }
        </ValiantContext.Provider>
    )
}

export default ValiantContextProvider;