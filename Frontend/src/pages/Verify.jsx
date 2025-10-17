import { useContext, useEffect } from "react"
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { ValiantContext } from "../context/ValiantContext";

const Verify = () => {
    const { navigate, token, setCartItems, backendUrl } = useContext(ValiantContext);
    const [searchParams, setSearchParams] = useSearchParams();
 
    const success = searchParams.get('success');
    const orderId = searchParams.get('orderId');

    const verifyPayment = async () => {

        try {
            if (!token) {
                return null;
            }
            const response = await axios.post(backendUrl + '/api/order/verifyStripe', { success, orderId }, { headers: { token } });
            console.log(orderId);
            if (response.data.success) {
                setCartItems({});
                navigate('/orders');

            } else {
                navigate('/cart');
                console.log(orderId);
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }
    useEffect(() => {
        verifyPayment();
    }, [token])
    return (
        <div>

        </div>
    )
}

export default Verify