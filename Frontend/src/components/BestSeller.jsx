import React, { useContext, useEffect, useState } from 'react';
import { ValiantContext } from '../context/ValiantContext';
import ProductItem from './ProductItem';

function BestSeller() {
  const { products, productsLoaded } = useContext(ValiantContext);
  const [bestProducts, setBestProducts] = useState([]);

  useEffect(() => {
    // ✅ Only filter when products actually loads
    if (productsLoaded && products.length > 0) {
      const filtered = products.filter(item => item.bestseller);
      setBestProducts(filtered.slice(0, 5));
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

  // ✅ Don't show empty state - just return nothing if no bestsellers
  // This allows the page to still render other sections
  if (productsLoaded && bestProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-3xl mx-auto text-center mb-9 space-y-2">
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-gray-300" />
            <span className="text-xs tracking-[0.3em] text-gray-500 uppercase">
              Customer Favorites
            </span>
            <div className="h-px w-8 bg-gray-300" />
          </div>

          <h2 className="text-4xl lg:text-5xl font-light text-gray-900">
            Best <span className="font-serif italic">Sellers</span>
          </h2>

          <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Our most-loved pieces, chosen by you. Discover why these styles have
            captured hearts and become wardrobe essentials.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-12">
          {bestProducts.map(item => (
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

export default BestSeller;