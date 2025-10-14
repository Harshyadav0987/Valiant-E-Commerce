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

    const handleChange = (e) => {
        setFormdata({...formdata,[e.target.name]:e.target.value})
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        // console.log(formdata);
        // navigate('/order-success')
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
                amount : getCartAmount() + deliveryFee,
            }

            switch(method){
                case 'cod':
                    const response = await axios.post(`${backendUrl}/api/order/placeorder`,orderData,{headers: {token}});
                    if(response.data.success){
                        setCartItems([])
                        navigate('/orders')
                    }
                    else{
                        toast.error("Error placing order");
                    }
                    break;
            }
        }catch(error){
            console.error("Error placing order:", error);
            toast.error("Error placing order");
        }
    }


     return (
    <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t '>
        {/* Left Side */}
        <div className='flex flex-col gap-4 w-full sm:max-w-[480px] '>
            <div className='text-xl sm:text-2xl my-3'>
                <Title text1={'DELIVERY'} text2={'ADDRESS'}/>
            </div>
            <div className='flex gap-3 '>
                <input onChange={handleChange} name="firstName" value={formdata.firstName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' type="text" placeholder='First Name' />
                <input onChange={handleChange} name="lastName" value={formdata.lastName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' type="text" placeholder='Last Name' />
            </div>
                <input onChange={handleChange} name="email" value={formdata.email} className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' type="email" placeholder='Email Address' />
                <input onChange={handleChange} name="street" value={formdata.street} className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' type="text" placeholder='Street' />
             <div className='flex gap-3 '>
                <input onChange={handleChange} name="city" value={formdata.city} className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' type="text" placeholder='City' />
                <input onChange={handleChange} name="state" value={formdata.state} className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' type="text" placeholder='State' />
            </div>
             <div className='flex gap-3 '>
                <input onChange={handleChange} name="zipcode" value={formdata.zipcode} className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' type="number" placeholder='Zipcode' />
                <input onChange={handleChange} name="country" value={formdata.country} className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' type="text" placeholder='Country' />
            </div>
                <input onChange={handleChange} name='phone' value={formdata.phone} className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' type="number" placeholder='Phone' />
        </div>

        {/* Right Side */}

        <div className='mt-8'>

            <div className='mt-8 min-w-80'>
                <CartTotal/>
            </div>

            <div className='mt-12 '>
                <Title text1={'PAYMENT'} text2={"METHOD"}/>

                {/* Payment method selection */}

                <div  className='flex gap-3 flex-col sm:flex-row'>
                    <div  onClick={()=>setMethod('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                        <p className={`min-w-3.5 h-3.5 border rounded-full ${method==='stripe'?'bg-red-400':''}`}>
                            <img className='h-5 mx-4' src={assets.stripe_logo} alt="" />
                        </p>
                    </div>
                    <div onClick={()=>setMethod('razorpay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                        <p className={`min-w-3.5 h-3.5 border rounded-full ${method==='razorpay'?'bg-red-400':''}`}>
                            <img className='h-5 mx-4' src={assets.razorpay_logo} alt="" />
                        </p>
                    </div>
                    <div onClick={()=>setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                        <p className={`min-w-3.5 h-3.5 border rounded-full ${method==='cod'?'bg-red-400':''}`}>
                            <p className='text-gray-500 text-sm font-medium mx-4 '>CASH ON DELIVERY</p>
                        </p>
                    </div>
                </div>
            </div>
                    <div className='w-full text-end mt-8'>
                        <button type="submit"   className='bg-black text-white px-16 py-3 text-sm'>
                            PLACE YOUR ORDER
                        </button>

                    </div>

        </div>
    </form>
  )
}

export default PlaceOrder
