import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ValiantContext } from '../context/ValiantContext';
import axios from 'axios';
import { toast } from 'react-toastify';


function PlaceOrder() {
    const [method,setMethod]= useState('cod');
    const {navigate,backendUrl,token,cartItems,setCartItems,getCartAmount,deliveryFee,products} = useContext(ValiantContext)
    const [formdata,setFormdata] = useState({
        firstName:'',
        lastName:'',
        email:'',
        street:'',
        city:'',
        state:'',
        zipcode:'',
        country:'',
        phone:''
    })

    const [loading, setLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState('');

    const handleChange = (e) => {
        setFormdata({...formdata,[e.target.name]:e.target.value})
    }

const handleSubmit = async(e) => {
    e.preventDefault();
    
    // Prevent multiple submissions
    if (loading) return;
    
    try{
        let orderItems = [];

        for(const items in cartItems){
            for(const itemSize in cartItems[items].sizes){
                const itemInfo = products.find((product) => product._id === items)
                if(itemInfo){
                    orderItems.push({
                        product: itemInfo,
                        size: itemSize,
                        quantity: cartItems[items].sizes[itemSize]
                    })
                }
            }
        }

        let orderData ={
            address : formdata,
            items : orderItems,
            amount : getCartAmount() + deliveryFee + getCartAmount()*0.1,
        }

        switch(method){
            case 'cod':
                setLoading(true);
                setLoadingMessage('Processing your order...');
                const response = await axios.post(`${backendUrl}/api/order/placeorder`,orderData,{headers: {token}});
                if(response.data.success){
                    setCartItems({})
                    navigate('/orders')
                }
                else{
                    toast.error("Error placing order");
                    setLoading(false);
                }
                break;
            case 'stripe':
                setLoading(true);
                setLoadingMessage('Redirecting to Stripe...');
                const responseStripe = await axios.post(`${backendUrl}/api/order/placestripeorder`,orderData,{headers: {token}});
                if(responseStripe.data.success){
                    const {session_url} = responseStripe.data
                    window.location.replace(session_url)
                }
                else{
                    toast.error(responseStripe.data.message)
                    setLoading(false);
                }
                break;
            case 'razorpay':
                setLoading(true);
                setLoadingMessage('Loading payment gateway...');
                const responseRazorpay = await axios.post(`${backendUrl}/api/order/placerazorpayorder`,orderData,{headers: {token}});
                if(responseRazorpay.data.success){
                    initpay(responseRazorpay.data.order, responseRazorpay.data.orderId) // Pass orderId
                    setLoading(false);
                }
                else{
                    toast.error(responseRazorpay.data.message)
                    setLoading(false);
                }
                break;
        }
    }catch(error){
        console.error("Error placing order:", error);
        toast.error("Error placing order");
        setLoading(false); // Hide loading on error
    }
}

const initpay = async (order, mongoOrderId) => { // Renamed parameter for clarity
    const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Order Payment",
        description: 'order payment',
        order_id: order.id, // This is Razorpay's order ID
        handler: async (response) => {
            console.log(response);
            try {
                const { data } = await axios.post(
                    `${backendUrl}/api/order/verifyrazorpay`,
                    response, // Contains razorpay_order_id, razorpay_payment_id, razorpay_signature
                    { headers: { token } }
                );
                
                if (data.success) {
                    navigate("/orders");
                    setCartItems({});
                }
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        },
        modal: {
            ondismiss: async () => {
                console.log("Payment cancelled - deleting order:", mongoOrderId);
                try {
                    await axios.post(
                        `${backendUrl}/api/order/deleteunpaid`,
                        { orderId: mongoOrderId }, // Use MongoDB order ID here
                        { headers: { token } }
                    );
                    toast.info("Payment cancelled. Order removed.");
                    setLoading(false);
                } catch (error) {
                    console.log(error);
                }
            }
        }
    };
    
    const rzp = new window.Razorpay(options);
    rzp.open();
};


return (
    <>
        {/* Loading Overlay */}
        {loading && (
            <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
                <div className='bg-white p-8 rounded-lg flex flex-col items-center gap-4'>
                    <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-black'></div>
                    <p className='text-gray-700 font-medium'>{loadingMessage}</p>
                </div>
            </div>
        )}

        <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t '>
            {/* Left Side */}
            <div className='flex flex-col gap-4 w-full sm:max-w-[480px] '>
                <div className='text-xl sm:text-2xl my-3'>
                    <Title text1={'DELIVERY'} text2={'ADDRESS'}/>
                </div>
                <div className='flex gap-3 '>
                    <input onChange={handleChange} name="firstName" value={formdata.firstName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' type="text" placeholder='First Name' required />
                    <input onChange={handleChange} name="lastName" value={formdata.lastName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' type="text" placeholder='Last Name' required />
                </div>
                <input onChange={handleChange} name="email" value={formdata.email} className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' type="email" placeholder='Email Address' required />
                <input onChange={handleChange} name="street" value={formdata.street} className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' type="text" placeholder='Street' required />
                <div className='flex gap-3 '>
                    <input onChange={handleChange} name="city" value={formdata.city} className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' type="text" placeholder='City' required />
                    <input onChange={handleChange} name="state" value={formdata.state} className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' type="text" placeholder='State' required />
                </div>
                <div className='flex gap-3 '>
                    <input onChange={handleChange} name="zipcode" value={formdata.zipcode} className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' type="number" placeholder='Zipcode' required />
                    <input onChange={handleChange} name="country" value={formdata.country} className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' type="text" placeholder='Country' required />
                </div>
                <input onChange={handleChange} name='phone' value={formdata.phone} className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' type="number" placeholder='Phone' required />
            </div>

            {/* Right Side */}
            <div className='mt-8'>
                <div className='mt-8 min-w-80'>
                    <CartTotal/>
                </div>

                <div className='mt-12 '>
                    <Title text1={'PAYMENT'} text2={"METHOD"}/>

                    {/* Payment method selection */}
                    <div className='flex gap-3 flex-col sm:flex-row'>
                        <div onClick={()=>setMethod('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method==='stripe'?'bg-red-400':''}`}></p>
                            <img className='h-5' src={assets.stripe_logo} alt="" />
                        </div>
                        <div onClick={()=>setMethod('razorpay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method==='razorpay'?'bg-red-400':''}`}></p>
                            <img className='h-5' src={assets.razorpay_logo} alt="" />
                        </div>
                        <div onClick={()=>setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method==='cod'?'bg-red-400':''}`}></p>
                            <p className='text-gray-500 text-sm font-medium'>CASH ON DELIVERY</p>
                        </div>
                    </div>
                </div>

                <div className='w-full text-end mt-8'>
                    <button 
                        type="submit" 
                        disabled={loading}
                        className={`bg-black text-white px-16 py-3 text-sm transition-opacity ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'}`}
                    >
                        {loading ? 'PROCESSING...' : 'PLACE YOUR ORDER'}
                    </button>
                </div>
            </div>
        </form>
    </>
)
}

export default PlaceOrder
