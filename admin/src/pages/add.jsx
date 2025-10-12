import { useState } from "react"
import axios from 'axios'
import { backendUrl } from '../App'
import { Upload, Package, DollarSign, Tag, Ruler } from "lucide-react"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUpload} from '@fortawesome/free-solid-svg-icons'



const Add = ({token,toast}) => {
  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("Men")
  const [subCategory, setSubCategory] = useState("Topwear")
  const [bestseller, setBestseller] = useState(false)
  const [sizes, setSizes] = useState([])

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData()
      formData.append("name", name)
      formData.append("description", description)
      formData.append("price", price)
      formData.append("category", category)
      formData.append("subCategory", subCategory)
      formData.append("bestseller", bestseller)
      formData.append("sizes", JSON.stringify(sizes))

      image1 && formData.append('image1', image1)
      image2 && formData.append('image2', image2)
      image3 && formData.append('image3', image3)
      image4 && formData.append('image4', image4)

      const response = await axios.post(backendUrl + "/api/product/add", formData, { headers: { token } })
      if (response.data.success) {
        toast.success(response.data.message)
        setName('')
        setDescription('')
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
        setPrice('')
      } else {
        toast.error(response.data.massage)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6 md:p-10">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-light text-gray-800 mb-2">Add New Product</h1>
          <p className="text-gray-500">Create a new product listing with detailed information</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8 md:p-12 space-y-10">
            
            {/* Image Upload Section */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
                  <Upload className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-medium text-gray-800">Product Images</h2>
                  <p className="text-sm text-gray-400">Upload up to 4 high-quality images</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                {[
                  { state: image1, setState: setImage1, id: "image1" },
                  { state: image2, setState: setImage2, id: "image2" },
                  { state: image3, setState: setImage3, id: "image3" },
                  { state: image4, setState: setImage4, id: "image4" }
                ].map((img, idx) => (
                  <label key={img.id} htmlFor={img.id} className="group cursor-pointer">
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden border-2 border-dashed border-gray-300 hover:border-gray-800 transition-all duration-300 bg-gray-50 hover:bg-gray-100">
                      <img 
                        className="w-full h-full object-cover" 
                        src={!img.state ? ' ' : URL.createObjectURL(img.state)} 
                        alt="" 
                      />
                      {!img.state && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <FontAwesomeIcon icon={faUpload} className="w-5 h-5 text-gray-400 mx-auto group-hover:text-gray-800 transition-colors" />
                          </div>
                        </div>
                      )}
                    </div>
                    <input 
                      onChange={(e) => img.setState(e.target.files[0])} 
                      type="file" 
                      id={img.id} 
                      hidden 
                      accept="image/*"
                    />
                  </label>
                ))}
              </div>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>

            {/* Product Details Section */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
                  <Package className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-medium text-gray-800">Product Details</h2>
                  <p className="text-sm text-gray-400">Basic information about the product</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-2">Product Name</label>
                  <input 
                    onChange={(e) => setName(e.target.value)} 
                    value={name} 
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-gray-800 focus:ring-2 focus:ring-gray-800 focus:ring-opacity-20 outline-none transition-all text-gray-800 placeholder-gray-400" 
                    type="text" 
                    placeholder="Enter product name" 
                    required 
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-2">Product Description</label>
                  <textarea 
                    onChange={(e) => setDescription(e.target.value)} 
                    value={description} 
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-gray-800 focus:ring-2 focus:ring-gray-800 focus:ring-opacity-20 outline-none transition-all text-gray-800 placeholder-gray-400 min-h-[120px] resize-none" 
                    placeholder="Describe your product in detail..." 
                    required 
                  />
                </div>
              </div>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>

            {/* Categories & Price Section */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
                  <Tag className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-medium text-gray-800">Categories & Pricing</h2>
                  <p className="text-sm text-gray-400">Organize and price your product</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-2">Category</label>
                  <select 
                    onChange={(e) => setCategory(e.target.value)} 
                    value={category}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-gray-800 focus:ring-2 focus:ring-gray-800 focus:ring-opacity-20 outline-none transition-all text-gray-800 bg-white cursor-pointer"
                  >
                    <option value="Men">Men</option>
                    <option value="Woman">Women</option>
                    <option value="Kids">Kids</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-2">Sub Category</label>
                  <select 
                    onChange={(e) => setSubCategory(e.target.value)} 
                    value={subCategory}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-gray-800 focus:ring-2 focus:ring-gray-800 focus:ring-opacity-20 outline-none transition-all text-gray-800 bg-white cursor-pointer"
                  >
                    <option value="Topwear">Topwear</option>
                    <option value="Bottomwear">Bottomwear</option>
                    <option value="Winterwear">Winterwear</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-2">Price ($)</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input 
                      onChange={(e) => setPrice(e.target.value)} 
                      value={price} 
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:border-gray-800 focus:ring-2 focus:ring-gray-800 focus:ring-opacity-20 outline-none transition-all text-gray-800 placeholder-gray-400" 
                      type="number" 
                      placeholder="0.00" 
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>

            {/* Sizes Section */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
                  <Ruler className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-medium text-gray-800">Available Sizes</h2>
                  <p className="text-sm text-gray-400">Select all applicable sizes</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                {["S", "M", "L", "XL", "XXL"].map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSizes(prev => 
                      prev.includes(size) 
                        ? prev.filter(item => item !== size) 
                        : [...prev, size]
                    )}
                    className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                      sizes.includes(size)
                        ? "bg-gray-800 text-white shadow-lg scale-105"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>

            {/* Bestseller Option */}
            <div>
              <label className="flex items-center gap-4 cursor-pointer group w-fit">
                <div className="relative">
                  <input 
                    onChange={() => setBestseller(prev => !prev)} 
                    checked={bestseller} 
                    type="checkbox" 
                    className="sr-only peer" 
                  />
                  <div className="w-12 h-6 bg-gray-300 rounded-full peer-checked:bg-gray-800 transition-all duration-300"></div>
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 peer-checked:translate-x-6"></div>
                </div>
                <div>
                  <span className="text-gray-800 font-medium group-hover:text-gray-900 transition-colors">Mark as Bestseller</span>
                  <p className="text-sm text-gray-400">Feature this product prominently</p>
                </div>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="px-8 md:px-12 py-6 bg-gray-50 border-t border-gray-200">
            <button 
              onClick={onSubmitHandler}
              className="w-full md:w-auto px-12 py-4 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5" 
              type="button"
            >
              Add Product
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Add