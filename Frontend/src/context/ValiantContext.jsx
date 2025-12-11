import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export const ValiantContext = createContext();
import axios from "axios";

const ValiantContextProvider = (props) => {
    
    const currency = import.meta.env.VITE_CURRENCY;
    const deliveryFee = 99;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [search, setSearch] = useState('');
    const [ShowSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState(localStorage.getItem("valiantToken") || '');

    // Setup axios interceptor to handle 401 errors globally
    useEffect(() => {
        const interceptor = axios.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response?.status === 401 && error.response?.data?.tokenExpired) {
                    // Token expired, logout user
                    handleLogout();
                    toast.error("Session expired. Please login again.");
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axios.interceptors.response.eject(interceptor);
        };
    }, []);

    const handleLogout = () => {
        setToken("");
        localStorage.removeItem("valiantToken");
        setCartItems({});
        navigate("/signup");
        window.location.reload(); // Force reload to clear all state
    };

    const addToCart = async (itemId, size) => {
        if (!size) {
            toast.error("Select product size");
            return;
        }

        if (token) {
            try {
                const response = await axios.post(
                    `${backendUrl}/api/cart/add`,
                    { itemId, size },
                    { headers: { token } }
                );
                
                if (response.data.success) {
                    await getUserCart();
                    toast.success("Item added to cart");
                } else {
                    toast.error(response.data.message);
                }
            } catch (error) {
                console.error("Error adding to cart:", error);
                if (error.response?.data?.tokenExpired) {
                    // Token expired, will be handled by interceptor
                    return;
                }
                toast.error("Error adding to cart");
            }
        } else {
            navigate("/signup");
            toast.info("Login to add items to cart");
        }
    };

    const getCartCount = () => {
        let totalCount = 0;

        for (const items in cartItems) {
            for (const item in cartItems[items].sizes) {
                totalCount += cartItems[items].sizes[item];
            }
        }

        return totalCount;
    };

    const updateQuantity = async (itemId, size, quantity) => {
        if (token) {
            try {
                const response = await axios.post(
                    `${backendUrl}/api/cart/update`,
                    { itemId, size, quantity },
                    { headers: { token } }
                );
                
                if (response.data.success) {
                    await getUserCart();
                } else {
                    toast.error(response.data.message);
                }
            } catch (error) {
                console.error("Error updating cart:", error);
                if (error.response?.data?.tokenExpired) {
                    // Token expired, will be handled by interceptor
                    return;
                }
                toast.error("Error updating cart");
            }
        }
    };

    const getUserCart = async () => {
        if (token) {
            try {
                const response = await axios.get(
                    `${backendUrl}/api/cart/get`,
                    { headers: { token } }
                );
                
                if (response.data.success) {
                    setCartItems(response.data.cartData);
                } else {
                    if (!response.data.tokenExpired) {
                        toast.error(response.data.message);
                    }
                }
            } catch (error) {
                console.error("Error fetching cart data:", error);
                if (error.response?.data?.tokenExpired) {
                    // Token expired, will be handled by interceptor
                    return;
                }
                toast.error("Error fetching cart data");
            }
        }
    };

    // Calculate total price
    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            const itemInfo = products.find((product) => product._id === items);
            if (itemInfo) {
                for (const item in cartItems[items].sizes) {
                    totalAmount += itemInfo.price * cartItems[items].sizes[item];
                }
            }
        }
        return totalAmount;
    };

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/product/list`);
            if (response.data.success) {
                setProducts(response.data.products);
            } else {
                toast.error("Error fetching products");
            }
        } catch (error) {
            console.error("Error fetching products:", error);
            toast.error("Error fetching products");
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        if (!token && localStorage.getItem("valiantToken")) {
            setToken(localStorage.getItem("valiantToken"));
        }

        if (token) {
            getUserCart();
        }
    }, [token]);

    const val = {
        products,
        currency,
        deliveryFee,
        search,
        setSearch,
        ShowSearch,
        setShowSearch,
        cartItems,
        setCartItems,
        addToCart,
        getCartCount,
        updateQuantity,
        getCartAmount,
        navigate,
        token,
        setToken,
        backendUrl,
        handleLogout
    };

    return (
        <ValiantContext.Provider value={val}>
            {props.children}
        </ValiantContext.Provider>
    );
};

export default ValiantContextProvider;