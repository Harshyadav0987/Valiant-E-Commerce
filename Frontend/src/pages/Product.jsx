// import React, { useContext, useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import { ValiantContext } from '../context/ValiantContext';
// import { assets } from '../assets/assets';
// import RelatedProducts from '../components/RelatedProducts';

// function Product() {
//     const {productId} = useParams();
//     const {products, currency,addToCart} = useContext(ValiantContext);
//     const [productData, setProductData] = useState(null);
//     const [image, setImage] = useState('');
//     const [size, setSize] = useState('');
//     const [activeTab, setActiveTab] = useState('description');

//     const fetchProductData = async() => {
//         const product = products.find((item) => item._id === productId);
//         if (product) {
//             setProductData(product);
//             setImage(product.image[0]);
//         }
//     }

//     useEffect(() => {
//         fetchProductData();
//         setSize('');
//     }, [productId, products])

//     return productData ? (
//         <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
//             {/* product data */}
//             <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
                
//                 {/* Product Images */}
//                 <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
//                     {/* Thumbnail images */}
//                     <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
//                         {
//                             productData.image.map((item, index) => (
//                                 <img 
//                                     onClick={() => setImage(item)}
//                                     src={item} 
//                                     key={index} 
//                                     className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer hover:opacity-80' 
//                                     alt={`Product ${index + 1}`}
//                                 />
//                             ))
//                         }
//                     </div>
                    
//                     {/* Main image */}
//                     <div className='w-full sm:w-[80%]'>
//                         <img src={image} className='w-full h-auto' alt="Main product"/>
//                     </div>
//                 </div>

//                 {/* Product Info */}
//                 <div className='flex-1 text-left'>
//                     <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
//                     <div className='flex items-center gap-1 mt-2'>
//                         <img src={assets.star_icon} alt="" className="w-3.5" />
//                         <img src={assets.star_icon} alt="" className="w-3.5" />
//                         <img src={assets.star_icon} alt="" className="w-3.5" />
//                         <img src={assets.star_icon} alt="" className="w-3.5" />
//                         <img src={assets.star_dull_icon} alt="" className="w-3.5" />
//                         <p className='pl-2'>(122)</p>
//                     </div>
//                     <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
//                     <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
//                     <div className='flex flex-col gap-4 my-8'>
//                         <p>Select Size</p>
//                         <div className='flex gap-2'>
//                             {productData.sizes.map((item, index) => (
//                                 <button onClick={() => setSize(size===item?'':item) } key={index} className={`border py-2 px-4 bg-gray-100 hover:border-gray-800 ${item === size ? 'border-gray-800' : ""}`}>
//                                     {item}
//                                 </button>
//                             ))}
//                         </div>
//                     </div>
//                     <button className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700' onClick={()=>addToCart(productData._id,size)}>
//                         ADD TO CART
//                     </button>
//                     <hr className='mt-8 sm:w-4/5' />
//                     <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
//                         <p>100% Original product.</p>
//                         <p>Cash on delivery is available on this product.</p>
//                         <p>Easy return and exchange policy within 7 days.</p>
//                     </div>
//                 </div>
                
//             </div>

//             {/* Description & Reviews Section */}
//             <div className='mt-20 text-left'>
//                 <div className='flex'>
//                     <b className={`border px-5 py-3 text-sm cursor-pointer ${activeTab === 'description' ? 'bg-gray-100' : ''}`} onClick={() => setActiveTab('description')}>
//                         Description
//                     </b>
//                     <b className={`border px-5 py-3 text-sm cursor-pointer ${activeTab === 'reviews' ? 'bg-gray-100' : ''}`} onClick={() => setActiveTab('reviews')}>
//                         Reviews (122)
//                     </b>
//                 </div>
                
//                 <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
//                     {activeTab === 'description' ? (
//                         <div>
//                             <p>An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence. E-commerce websites have gained immense popularity due to their convenience, accessibility, and the global reach they offer.</p>
//                             <br />
//                             <p>E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g., sizes, colors). Each product usually has its own dedicated page with relevant information.</p>
//                         </div>
//                     ) : (
//                         <div>
//                             {/* Sample Reviews */}
//                             <div className='border-b pb-4 mb-4'>
//                                 <div className='flex items-center gap-2 mb-2'>
//                                     <div className='flex'>
//                                         <img src={assets.star_icon} alt="" className="w-3" />
//                                         <img src={assets.star_icon} alt="" className="w-3" />
//                                         <img src={assets.star_icon} alt="" className="w-3" />
//                                         <img src={assets.star_icon} alt="" className="w-3" />
//                                         <img src={assets.star_icon} alt="" className="w-3" />
//                                     </div>
//                                     <p className='text-black font-medium'>John D.</p>
//                                     <p className='text-xs'>2 days ago</p>
//                                 </div>
//                                 <p>Excellent quality! The fabric is soft and comfortable. Fits perfectly as described. Highly recommend!</p>
//                             </div>
                            
//                             <div className='border-b pb-4 mb-4'>
//                                 <div className='flex items-center gap-2 mb-2'>
//                                     <div className='flex'>
//                                         <img src={assets.star_icon} alt="" className="w-3" />
//                                         <img src={assets.star_icon} alt="" className="w-3" />
//                                         <img src={assets.star_icon} alt="" className="w-3" />
//                                         <img src={assets.star_icon} alt="" className="w-3" />
//                                         <img src={assets.star_dull_icon} alt="" className="w-3" />
//                                     </div>
//                                     <p className='text-black font-medium'>Sarah M.</p>
//                                     <p className='text-xs'>1 week ago</p>
//                                 </div>
//                                 <p>Good product overall. The color is exactly as shown in the pictures. Fast delivery too!</p>
//                             </div>
                            
//                             <div className='border-b pb-4 mb-4'>
//                                 <div className='flex items-center gap-2 mb-2'>
//                                     <div className='flex'>
//                                         <img src={assets.star_icon} alt="" className="w-3" />
//                                         <img src={assets.star_icon} alt="" className="w-3" />
//                                         <img src={assets.star_icon} alt="" className="w-3" />
//                                         <img src={assets.star_icon} alt="" className="w-3" />
//                                         <img src={assets.star_icon} alt="" className="w-3" />
//                                     </div>
//                                     <p className='text-black font-medium'>Mike R.</p>
//                                     <p className='text-xs'>2 weeks ago</p>
//                                 </div>
//                                 <p>Amazing quality for the price. Will definitely order again. The sizing chart was accurate.</p>
//                             </div>

//                             {/* Write Review Section */}
//                             <div className='mt-6 pt-4 border-t'>
//                                 <h3 className='text-black font-medium mb-3'>Write a Review</h3>
//                                 <div className='flex gap-2 mb-3'>
//                                     <span className='text-black'>Rating:</span>
//                                     <div className='flex gap-1 cursor-pointer'>
//                                         <img src={assets.star_icon} alt="" className="w-4" />
//                                         <img src={assets.star_icon} alt="" className="w-4" />
//                                         <img src={assets.star_icon} alt="" className="w-4" />
//                                         <img src={assets.star_icon} alt="" className="w-4" />
//                                         <img src={assets.star_dull_icon} alt="" className="w-4" />
//                                     </div>
//                                 </div>
//                                 <textarea 
//                                     placeholder='Write your review here...' 
//                                     className='w-full border rounded p-3 text-sm resize-none h-24 mb-3'
//                                 ></textarea>
//                                 <button className='bg-black text-white px-6 py-2 text-sm rounded hover:bg-gray-800'>
//                                     Submit Review
//                                 </button>
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </div>

//             {/* Related Products Section */}
//             <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
//         </div>
//     ) : <div className='opacity-0'></div>
// }

// export default Product


import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ValiantContext } from '../context/ValiantContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

function Product() {
    const {productId} = useParams();
    const {products, currency,addToCart} = useContext(ValiantContext);
    const [productData, setProductData] = useState(null);
    const [image, setImage] = useState('');
    const [size, setSize] = useState('');
    const [activeTab, setActiveTab] = useState('description');

    const fetchProductData = async() => {
        const product = products.find((item) => item._id === productId);
        if (product) {
            setProductData(product);
            setImage(product.image[0]);
        }
    }

    useEffect(() => {
        fetchProductData();
        setSize('');
    }, [productId, products])

    return productData ? (
        <div className='bg-gradient-to-b from-gray-50 to-white min-h-screen'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 transition-opacity ease-in duration-500 opacity-100'>
                
                {/* Product Details Section */}
                <div className='flex gap-8 lg:gap-12 flex-col lg:flex-row'>
                    
                    {/* Product Images */}
                    <div className='flex-1 flex flex-col-reverse gap-4 sm:flex-row'>
                        {/* Thumbnail images */}
                        <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll gap-3 sm:gap-4 justify-start sm:justify-normal sm:w-[20%] w-full pb-2 sm:pb-0'>
                            {
                                productData.image.map((item, index) => (
                                    <div 
                                        key={index}
                                        onClick={() => setImage(item)}
                                        className={`relative flex-shrink-0 w-20 h-20 sm:w-full sm:h-auto sm:aspect-square rounded-lg overflow-hidden cursor-pointer border-2 transition-all duration-300 ${image === item ? 'border-gray-800 shadow-md' : 'border-gray-200 hover:border-gray-400 '}`}
                                    >
                                        <img 
                                            src={item} 
                                            className='w-full h-full object-cover' 
                                            alt={`Thumbnail ${index + 1}`}
                                        />
                                    </div>
                                ))
                            }
                        </div>
                        
                        {/* Main image */}
                        <div className='w-full sm:w-[78%] lg:flex-1'>
                            <div className='relative rounded-2xl overflow-hidden bg-gray-50 shadow-lg border border-gray-200'>
                                <img 
                                    src={image} 
                                    className='w-full h-auto object-cover' 
                                    alt="Main product"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className='flex-1 lg:max-w-xl'>
                        <div className='sticky top-24'>
                            {/* Product Title */}
                            <h1 className='font-bold text-3xl sm:text-4xl text-gray-900 leading-tight'>{productData.name}</h1>
                            
                            {/* Rating */}
                            <div className='flex items-center gap-3 mt-4'>
                                <div className='flex items-center gap-1'>
                                    {[...Array(4)].map((_, i) => (
                                        <img key={i} src={assets.star_icon} alt="" className="w-4 h-4" />
                                    ))}
                                    <img src={assets.star_dull_icon} alt="" className="w-4 h-4" />
                                </div>
                                <span className='text-sm text-gray-600 font-medium'>4.0</span>
                                <span className='text-sm text-gray-400'>|</span>
                                <span className='text-sm text-gray-600 hover:text-gray-900 cursor-pointer transition-colors'>122 reviews</span>
                            </div>

                            {/* Price */}
                            <div className='mt-6 flex items-baseline gap-3'>
                                <p className='text-4xl font-bold text-gray-900'>{currency}{productData.price}</p>
                                <span className='text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full font-medium'>In Stock</span>
                            </div>

                            {/* Description */}
                            <p className='mt-6 text-gray-600 leading-relaxed text-base'>{productData.description}</p>
                            
                            {/* Size Selection */}
                            <div className='mt-8'>
                                <div className='flex items-center justify-between mb-4'>
                                    <p className='text-sm font-semibold text-gray-900 uppercase tracking-wider'>Select Size</p>
                                    <button className='text-sm text-gray-600 hover:text-gray-900 underline transition-colors'>Size Guide</button>
                                </div>
                                <div className='flex flex-wrap gap-3'>
                                    {productData.sizes.map((item, index) => (
                                        <button 
                                            onClick={() => setSize(size===item?'':item)} 
                                            key={index} 
                                            className={`min-w-[60px] px-5 py-3 rounded-lg font-semibold text-sm transition-all duration-300 ${
                                                item === size 
                                                    ? 'bg-gray-900 text-white shadow-lg scale-105 border-2 border-gray-900' 
                                                    : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-gray-900 hover:shadow-md'
                                            }`}
                                        >
                                            {item}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Add to Cart Button */}
                            <button 
                                className='w-full mt-8 bg-gray-900 text-white px-8 py-4 text-sm font-bold uppercase tracking-wider rounded-xl hover:bg-gray-800 active:scale-98 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 group' 
                                onClick={()=>addToCart(productData._id,size)}
                            >
                                <svg className='w-5 h-5 group-hover:scale-110 transition-transform' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z' />
                                </svg>
                                Add to Cart
                            </button>

                            {/* Product Features */}
                            <div className='mt-8 bg-gray-50 rounded-xl p-6 border border-gray-200'>
                                <div className='space-y-3'>
                                    <div className='flex items-start gap-3'>
                                        <svg className='w-5 h-5 text-green-600 mt-0.5 flex-shrink-0' fill='currentColor' viewBox='0 0 20 20'>
                                            <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd' />
                                        </svg>
                                        <p className='text-sm text-gray-700 font-medium'>100% Original product</p>
                                    </div>
                                    <div className='flex items-start gap-3'>
                                        <svg className='w-5 h-5 text-green-600 mt-0.5 flex-shrink-0' fill='currentColor' viewBox='0 0 20 20'>
                                            <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd' />
                                        </svg>
                                        <p className='text-sm text-gray-700 font-medium'>Cash on delivery available</p>
                                    </div>
                                    <div className='flex items-start gap-3'>
                                        <svg className='w-5 h-5 text-green-600 mt-0.5 flex-shrink-0' fill='currentColor' viewBox='0 0 20 20'>
                                            <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd' />
                                        </svg>
                                        <p className='text-sm text-gray-700 font-medium'>Easy return & exchange within 7 days</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Description & Reviews Section */}
                <div className='mt-16 sm:mt-24'>
                    {/* Tabs */}
                    <div className='flex gap-1 border-b border-gray-200'>
                        <button 
                            className={`px-8 py-4 text-sm font-bold uppercase tracking-wider transition-all duration-300 relative ${
                                activeTab === 'description' 
                                    ? 'text-gray-900' 
                                    : 'text-gray-500 hover:text-gray-700'
                            }`} 
                            onClick={() => setActiveTab('description')}
                        >
                            Description
                            {activeTab === 'description' && (
                                <div className='absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900'></div>
                            )}
                        </button>
                        <button 
                            className={`px-8 py-4 text-sm font-bold uppercase tracking-wider transition-all duration-300 relative ${
                                activeTab === 'reviews' 
                                    ? 'text-gray-900' 
                                    : 'text-gray-500 hover:text-gray-700'
                            }`} 
                            onClick={() => setActiveTab('reviews')}
                        >
                            Reviews (122)
                            {activeTab === 'reviews' && (
                                <div className='absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900'></div>
                            )}
                        </button>
                    </div>
                    
                    {/* Tab Content */}
                    <div className='bg-white rounded-xl border border-gray-200 p-6 sm:p-8 mt-4 shadow-sm'>
                        {activeTab === 'description' ? (
                            <div className='prose max-w-none'>
                                <p className='text-gray-600 leading-relaxed mb-4'>
                                    An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence. E-commerce websites have gained immense popularity due to their convenience, accessibility, and the global reach they offer.
                                </p>
                                <p className='text-gray-600 leading-relaxed'>
                                    E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g., sizes, colors). Each product usually has its own dedicated page with relevant information.
                                </p>
                            </div>
                        ) : (
                            <div>
                                {/* Reviews List */}
                                <div className='space-y-6 mb-8'>
                                    {/* Review 1 */}
                                    <div className='bg-gray-50 rounded-xl p-6 border border-gray-200'>
                                        <div className='flex items-start justify-between mb-3'>
                                            <div>
                                                <div className='flex items-center gap-3 mb-2'>
                                                    <p className='text-gray-900 font-bold text-base'>John D.</p>
                                                    <span className='text-xs text-gray-500'>2 days ago</span>
                                                </div>
                                                <div className='flex gap-1'>
                                                    {[...Array(5)].map((_, i) => (
                                                        <img key={i} src={assets.star_icon} alt="" className="w-4 h-4" />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <p className='text-gray-700 leading-relaxed'>Excellent quality! The fabric is soft and comfortable. Fits perfectly as described. Highly recommend!</p>
                                    </div>

                                    {/* Review 2 */}
                                    <div className='bg-gray-50 rounded-xl p-6 border border-gray-200'>
                                        <div className='flex items-start justify-between mb-3'>
                                            <div>
                                                <div className='flex items-center gap-3 mb-2'>
                                                    <p className='text-gray-900 font-bold text-base'>Sarah M.</p>
                                                    <span className='text-xs text-gray-500'>1 week ago</span>
                                                </div>
                                                <div className='flex gap-1'>
                                                    {[...Array(4)].map((_, i) => (
                                                        <img key={i} src={assets.star_icon} alt="" className="w-4 h-4" />
                                                    ))}
                                                    <img src={assets.star_dull_icon} alt="" className="w-4 h-4" />
                                                </div>
                                            </div>
                                        </div>
                                        <p className='text-gray-700 leading-relaxed'>Good product overall. The color is exactly as shown in the pictures. Fast delivery too!</p>
                                    </div>

                                    {/* Review 3 */}
                                    <div className='bg-gray-50 rounded-xl p-6 border border-gray-200'>
                                        <div className='flex items-start justify-between mb-3'>
                                            <div>
                                                <div className='flex items-center gap-3 mb-2'>
                                                    <p className='text-gray-900 font-bold text-base'>Mike R.</p>
                                                    <span className='text-xs text-gray-500'>2 weeks ago</span>
                                                </div>
                                                <div className='flex gap-1'>
                                                    {[...Array(5)].map((_, i) => (
                                                        <img key={i} src={assets.star_icon} alt="" className="w-4 h-4" />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <p className='text-gray-700 leading-relaxed'>Amazing quality for the price. Will definitely order again. The sizing chart was accurate.</p>
                                    </div>
                                </div>

                                {/* Write Review Section */}
                                <div className='bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 sm:p-8 border-2 border-gray-200'>
                                    <h3 className='text-gray-900 font-bold text-xl mb-6'>Write a Review</h3>
                                    
                                    <div className='mb-5'>
                                        <label className='block text-sm font-semibold text-gray-700 mb-2'>Your Rating</label>
                                        <div className='flex gap-2 cursor-pointer'>
                                            {[...Array(4)].map((_, i) => (
                                                <img key={i} src={assets.star_icon} alt="" className="w-6 h-6 hover:scale-110 transition-transform" />
                                            ))}
                                            <img src={assets.star_dull_icon} alt="" className="w-6 h-6 hover:scale-110 transition-transform" />
                                        </div>
                                    </div>

                                    <div className='mb-5'>
                                        <label className='block text-sm font-semibold text-gray-700 mb-2'>Your Review</label>
                                        <textarea 
                                            placeholder='Share your experience with this product...' 
                                            className='w-full border-2 border-gray-300 rounded-xl p-4 text-sm resize-none h-32 focus:outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-200 transition-all'
                                        ></textarea>
                                    </div>

                                    <button className='bg-gray-900 text-white px-8 py-3 text-sm font-bold uppercase tracking-wider rounded-xl hover:bg-gray-800 transition-all duration-300 shadow-md hover:shadow-lg'>
                                        Submit Review
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Related Products Section */}
                <div className='mt-16 sm:mt-24'>
                    <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
                </div>
            </div>
        </div>
    ) : <div className='opacity-0'></div>
}

export default Product