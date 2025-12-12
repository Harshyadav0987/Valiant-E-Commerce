// import axios from 'axios'
// import { backendUrl, currency } from '../App'
// // import { useEffect, useState } from "react"
// import { toast } from 'react-toastify'

// const List = ({ token }) => {
//   const [list, setList] = useState([])
//   const fetchList = async () => {
//     try {
//       const response = await axios.get(backendUrl + '/api/product/list',{headers: { token }})
//       // console.log(response.data);
//       if (response.data.success) {
//         setList(response.data.products);
//       }
//       else {
//         toast.error(response.data.message)
//       }

//     } catch (error) {
//       console.log(error);
//       toast.error(error.message)
//     }
//   }

//   const removeProduct = async (id) => {
//     try {
//       const response = await axios.post(backendUrl + '/api/product/remove/', { id }, { headers: { token } })
//       if (response.data.success) {
//         toast.success(response.data.message)
//         await fetchList()
//       } else {
//         toast.error(response.data.message)
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message)
//     }
//   }

//   useEffect(() => {
//     fetchList()
//   }, [])
//   return (
//     <>
//       <p className='mb-2'>All Products List</p>
//       <div className='flex flex-col gap-2'>
//         {/* List Table Title */}
//         <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
//           <b>Image</b>
//           <b>Name</b>
//           <b>Category</b>
//           <b>Price</b>
//           <b className='text-center'>Action</b>
//         </div>

//         {/* Product List*/}

//         {list.map((item, index) => (
//           <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm' key={index}>
//             <img className='w-12' src={item.images[0]} alt="" />
//             <p>{item.name}</p>
//             <p>{item.category}</p>
//             <p>{currency}{item.price}</p>
//             <p onClick={() => removeProduct(item._id)} className='text-right md:text-center cursor-pointer text-lg'>X</p>
//           </div>
//         ))
//         }

//       </div>
//     </>
//   )
// }

// export default List

import axios from 'axios'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import { useEffect, useState } from "react"
import { Trash2, Package, Search, Grid3x3 ,Edit} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'


const List = ({ token,toast }) => {
  const [list, setList] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  
  const navigate = useNavigate();
  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list',{headers: { token }})
      if (response.data.success) {
        setList(response.data.products);
        // toast.success(response.data.message)
      } else {
        console.error(response.data.message)
      }
      
    } catch (error) {
      console.log(error);
    }
  }

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(backendUrl + '/api/product/remove/', { id }, { headers: { token } })
      if (response.data.success) {
        await fetchList()
        toast.success(response.data.message)
      } else {
        console.error(response.data.message)
      }
      
    } catch (error) {
      console.log(error);
    }
  }

  const updateProduct = async (id) => {
    try {
      console.log("updating product with id:", id);
      navigate("/update/"+id);
      
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  const filteredList = list.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gray-800 rounded-lg">
              <Package className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Product Inventory</h1>
          </div>
          <p className="text-gray-600 ml-14">Manage and organize your product catalog</p>
        </div>

        {/* Stats and Search Bar */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-6">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Products</p>
                <p className="text-2xl font-bold text-gray-800">{list.length}</p>
              </div>
              <div className="h-12 w-px bg-gray-200"></div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Displayed</p>
                <p className="text-2xl font-bold text-gray-800">{filteredList.length}</p>
              </div>
            </div>
            
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent transition-all"
              />
            </div>
          </div>
        </div>

        {/* Products Grid/List */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Table Header - Desktop */}
          <div className="hidden md:grid grid-cols-[80px_1fr_150px_120px_100px] items-center px-6 py-4 bg-gray-50 border-b border-gray-200">
            <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Image</span>
            <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Product Name</span>
            <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Category</span>
            <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Price</span>
            <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider text-center">Action</span>
          </div>

          {/* Products List */}
          <div className="divide-y divide-gray-100">
            {filteredList.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 px-4">
                <Grid3x3 className="w-16 h-16 text-gray-300 mb-4" />
                <p className="text-gray-600 text-lg font-medium mb-1">No products found</p>
                <p className="text-gray-400 text-sm">Try adjusting your search criteria</p>
              </div>
            ) : (
              filteredList.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-[80px_1fr_150px_120px_100px] items-center gap-4 md:gap-0 px-6 py-5 hover:bg-gray-50 transition-all duration-200 group"
                >
                  {/* Image */}
                  <div className="flex items-center justify-center md:justify-start">
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-gray-100 ring-1 ring-gray-200 group-hover:ring-gray-300 transition-all">
                      <img
                        className="w-full h-full object-cover"
                        src={item.images[0]}
                        alt={item.name}
                      />
                    </div>
                  </div>

                  {/* Product Info - Mobile Layout */}
                  <div className="md:hidden flex flex-col gap-2">
                    <h3 className="font-semibold text-gray-800">{item.name}</h3>
                    <div className="flex items-center gap-4">
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                        {item.category}
                      </span>
                      <span className="text-lg font-bold text-gray-800">
                        {currency}{item.price}
                      </span>
                    </div>
                  </div>

                  {/* Desktop Layout */}
                  <div className="hidden md:block">
                    <h3 className="font-semibold text-gray-800 group-hover:text-gray-900 transition-colors">
                      {item.name}
                    </h3>
                  </div>

                  <div className="hidden md:block">
                    <span className="inline-flex px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                      {item.category}
                    </span>
                  </div>

                  <div className="hidden md:block">
                    <span className="text-lg font-bold text-gray-800">
                      {currency}{item.price}
                    </span>
                  </div>

                  {/* Action Button */}
                  <div className="flex justify-start md:justify-center gap-2 w-4 ml-3">
                    <button
                      onClick={() => removeProduct(item._id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-red-600 hover:text-white hover:bg-red-600 border border-red-200 hover:border-red-600 rounded-lg transition-all duration-200"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span className="font-medium">Delete</span>
                    </button>
                    <button
                      onClick={() => updateProduct(item._id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-blue-600 hover:text-white hover:bg-blue-600 border border-blue-200 hover:border-blue-600 rounded-lg transition-all duration-200"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span className="font-medium">Update</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer Info */}
        {filteredList.length > 0 && (
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-500">
              Showing {filteredList.length} of {list.length} products
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default List