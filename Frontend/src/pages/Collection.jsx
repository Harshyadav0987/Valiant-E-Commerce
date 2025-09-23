import React, { useContext, useEffect, useState } from 'react'
import { ValiantContext } from '../context/ValiantContext'
import { assets } from '../assets/assets';
import Title from "../components/Title"
import ProductItem from "../components/ProductItem"

function Collection() {
    const {products,search,ShowSearch} = useContext(ValiantContext);
    const [showFilter,setshowFilter] =useState(false);
    const [filterProducts,setfilterProducts] = useState([]);
    const [category,setCategory]=useState([]);
    const [subCategory,setSubCategory] = useState([]);
    const [sortType,setSortType] = useState('relevent');

    const toggleCategory = (e)=>{

        if(category.includes(e.target.value)){
            setCategory(prev=> prev.filter(item => item !== e.target.value))
        }
        else{
            setCategory(prev=>[...prev,e.target.value])
        }

    }
    const toggleSubCategory = (e)=>{

        if(subCategory.includes(e.target.value)){
            setSubCategory(prev=> prev.filter(item => item !== e.target.value))
        }
        else{
            setSubCategory(prev=>[...prev,e.target.value])
        }
    }

    const applyFilter=()=>{
        let productsCopy = products.slice();

        if(ShowSearch && search){
            productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
        }

        if(category.length>0){
            productsCopy = productsCopy.filter(item=>category.includes(item.category));
        }
        if(subCategory.length>0){
            productsCopy = productsCopy.filter(item=>subCategory.includes(item.subCategory));
        }

        setfilterProducts(productsCopy);
    }

    const sortProduct=()=>{
        let fpcopy = filterProducts.slice();

        switch(sortType){
            case 'low-high' :
                setfilterProducts(fpcopy.sort((a,b)=>(a.price - b.price)));
                break;

            case 'high-low' :
                setfilterProducts(fpcopy.sort((a,b)=>(b.price - a.price)));
                break;

            default :
                applyFilter();
                break;
        }
    }
    useEffect(()=>{
        applyFilter();
    },[category,subCategory,search])

    useEffect(()=>{
        sortProduct();
    },[sortType])

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t text-gray-800'>

        {/* Filter Options */}

        <div className='min-w-60'>
            <p className='my-2 text-xl flex items-center gap-2 cursor-pointer' onClick={()=>setshowFilter(!showFilter)}>FILTERS
                <img className={`h-3 sm:hidden ${showFilter ? "rotate-90": " "} `} src={assets.dropdown_icon} alt="" />
            </p>
            <div className={`border border-gray-500 pl-3 py-5 mt-6 ${showFilter ? '' : 'hidden'} sm:flex flex-col`}>
                <p className='mb-3 text-sm font-medium uppercase'>Categories</p>
                
                <div className='flex flex-col gap-2 text-sm font-light text-gray-800'>
                    <label className='flex gap-2 items-center'>
                        <input className='w-3 cursor-pointer' type="checkbox" value="Men"  onChange={toggleCategory}/>
                        Men
                    </label>
                    <label className='flex gap-2 items-center'>
                        <input className='w-3 cursor-pointer' type="checkbox" value="Women" onChange={toggleCategory}/>
                        Women
                    </label>
                    <label className='flex gap-2 items-center'>
                        <input className='w-3 cursor-pointer' type="checkbox" value="Kids" onChange={toggleCategory}/>
                        Kids
                    </label>
                </div>
            </div>

        {/* Sub category Filter */}
        
            <div className={`border border-gray-500 pl-3 py-5 my-5 ${showFilter ? '' : 'hidden'} sm:flex flex-col`}>
                <p className='mb-3 text-sm font-medium uppercase'>Type</p>
                
                <div className='flex flex-col gap-2 text-sm font-light text-gray-800'>
                    <label className='flex gap-2 items-center'>
                        <input className='w-3 cursor-pointer' type="checkbox" value="Topwear" onChange={toggleSubCategory}/>
                        Topwear
                    </label>

                    <label className='flex gap-2 items-center'>
                        <input className='w-3 cursor-pointer' type="checkbox" value="Bottomwear" onChange={toggleSubCategory}/>
                        Bottomwear
                    </label>

                    <label className='flex gap-2 items-center'>
                        <input className='w-3 cursor-pointer' type="checkbox" value="Winterwear" onChange={toggleSubCategory}/>
                        Winterwear
                    </label>
                </div>
            </div>

        </div>

        {/* Right side */}

        <div className='flex-1'>
            <div className='flex justify-between text-base sm:text-2xl mb-4'>
                <Title text1={'ALL'} text2={'COLLECTIONS'}/>
                {/* Product sort */}
                <select className='border-2 border-gray-500 text-sm px-2' onChange={(e)=>setSortType(e.target.value)}>
                    <option value="relevent">Sort by: Relevent</option>
                    <option value="low-high">Sort by: Low to High</option>
                    <option value="high-low">Sort by: High to Low</option>
                </select>

                {/* Map products */}

            </div>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
                {
                    filterProducts.map((item,index)=>(
                        <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image}/>
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default Collection