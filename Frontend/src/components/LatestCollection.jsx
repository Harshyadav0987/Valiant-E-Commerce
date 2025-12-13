import { useContext, useEffect, useState } from 'react';
import { ValiantContext } from '../context/ValiantContext';
import ProductItem from './ProductItem';

function LatestCollection() {
  const { products, productsLoaded } = useContext(ValiantContext);
  const [LatestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    // ✅ Only update when products actually loads
    if (productsLoaded && products.length > 0) {
      setLatestProducts(products.slice(0, 10));
    }
  }, [products, productsLoaded]);

  // ✅ Show loading only when data hasn't loaded yet
  if (!productsLoaded) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // ✅ Don't show empty state - just return nothing if no products
  // This allows the page to still render other sections
  if (productsLoaded && products.length === 0) {
    return null;
  }

  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-3xl mx-auto text-center mb-9 space-y-2">
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-gray-300" />
            <span className="text-xs tracking-[0.3em] text-gray-500 uppercase">New In</span>
            <div className="h-px w-8 bg-gray-300" />
          </div>

          <h2 className="text-4xl lg:text-5xl font-light text-gray-900">
            Latest <span className="font-serif italic">Collections</span>
          </h2>

          <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Where sophistication meets everyday comfort. Each piece is thoughtfully designed to elevate your wardrobe with timeless appeal and modern refinement.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-12">
          {LatestProducts.map((item) => (
            <ProductItem
              key={item._id}
              id={item._id}
              images={item.images}
              name={item.name}
              price={item.price}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default LatestCollection;