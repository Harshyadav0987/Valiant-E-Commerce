const sampleProducts = [
  {
    name: "BMW X5",
    description: "Luxury SUV with advanced features and premium comfort.",
    image: ["https://images.unsplash.com/photo-1606813902911-5d3a3f1a8a47"],
    price: 7500000,
    stock: 5,
    category: "Car"
  },
  {
    name: "iPhone 15 Pro Max",
    description: "Apple's latest flagship smartphone with A17 Pro chip and titanium design.",
    image: ["https://images.unsplash.com/photo-1695048137755-bf6f79c8a1f1"],
    price: 159999,
    stock: 50,
    category: "Mobile"
  },
  {
    name: "Samsung Galaxy S24 Ultra",
    description: "High-end Android phone with 200MP camera and S Pen.",
    image: ["https://images.unsplash.com/photo-1610465299991-90a7f2439f29"],
    price: 139999,
    stock: 40,
    category: "Mobile"
  },
  {
    name: "Sony WH-1000XM5 Headphones",
    description: "Industry-leading noise cancellation wireless headphones.",
    image: ["https://images.unsplash.com/photo-1618365908648-e71bd3a36336"],
    price: 29999,
    stock: 70,
    category: "Electronics"
  },
  {
    name: "Nike Air Jordan 1 Retro",
    description: "Classic basketball sneakers with premium leather design.",
    image: ["https://images.unsplash.com/photo-1513188732902-824f08a0a2e6"],
    price: 12999,
    stock: 100,
    category: "Fashion"
  },
  {
    name: "Levi’s Men’s Slim Fit Jeans",
    description: "Comfortable stretchable denim jeans for everyday wear.",
    image: ["https://images.unsplash.com/photo-1525171254930-643fc658b64e"],
    price: 3999,
    stock: 200,
    category: "Fashion"
  },
  {
    name: "Apple MacBook Air M2",
    description: "13-inch MacBook Air with Apple M2 chip, ultra-portable design.",
    image: ["https://images.unsplash.com/photo-1580934098636-cf61cd4e2f47"],
    price: 114999,
    stock: 30,
    category: "Laptop"
  },
  {
    name: "HP Pavilion Gaming Laptop",
    description: "15.6-inch gaming laptop with Ryzen 5 and NVIDIA GTX graphics.",
    image: ["https://images.unsplash.com/photo-1517336714731-489689fd1ca8"],
    price: 78999,
    stock: 25,
    category: "Laptop"
  },
  {
    name: "Samsung 55-inch QLED TV",
    description: "4K Ultra HD Smart TV with Quantum Dot technology.",
    image: ["https://images.unsplash.com/photo-1593784991095-7a9d58b907df"],
    price: 69999,
    stock: 15,
    category: "Electronics"
  },
  {
    name: "Boat Airdopes 141",
    description: "True wireless earbuds with 42 hours of playback and ASAP charging.",
    image: ["https://images.unsplash.com/photo-1606220649347-3e96e5cddf86"],
    price: 1499,
    stock: 300,
    category: "Electronics"
  },
  {
    name: "Adidas Ultraboost 23",
    description: "High-performance running shoes with responsive cushioning.",
    image: ["https://images.unsplash.com/photo-1606813895405-d4c685b7aaf8"],
    price: 15999,
    stock: 80,
    category: "Fashion"
  },
  {
    name: "Canon EOS 1500D DSLR Camera",
    description: "DSLR camera with 24.1 MP sensor and full HD recording.",
    image: ["https://images.unsplash.com/photo-1519183071298-a2962be96c73"],
    price: 39999,
    stock: 10,
    category: "Electronics"
  },
  {
    name: "Apple Watch Series 9",
    description: "Smartwatch with advanced health and fitness tracking.",
    image: ["https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b"],
    price: 45999,
    stock: 60,
    category: "Wearables"
  },
  {
    name: "Samsung Refrigerator 324L",
    description: "Frost-free double door refrigerator with inverter technology.",
    image: ["https://images.unsplash.com/photo-1598032895204-1323f14dca9e"],
    price: 38999,
    stock: 12,
    category: "Home Appliance"
  },
  {
    name: "Philips Air Fryer",
    description: "Oil-free air fryer with rapid air technology for healthy cooking.",
    image: ["https://images.unsplash.com/photo-1606813909355-cdc375e75b8f"],
    price: 9999,
    stock: 40,
    category: "Home Appliance"
  },
  {
    name: "OnePlus 12",
    description: "Flagship killer smartphone with Snapdragon 8 Gen 3 and AMOLED display.",
    image: ["https://images.unsplash.com/photo-1588422333075-4e5d32d14f6f"],
    price: 69999,
    stock: 45,
    category: "Mobile"
  },
  {
    name: "Dell XPS 13",
    description: "Premium ultrabook with InfinityEdge display and Intel i7 processor.",
    image: ["https://images.unsplash.com/photo-1517336714731-489689fd1ca8"],
    price: 124999,
    stock: 20,
    category: "Laptop"
  },
  {
    name: "Samsung Galaxy Watch 6",
    description: "Smartwatch with AMOLED display and advanced fitness features.",
    image: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30"],
    price: 35999,
    stock: 55,
    category: "Wearables"
  },
  {
    name: "LG Washing Machine 7kg",
    description: "Front load washing machine with 6 Motion Direct Drive.",
    image: ["https://images.unsplash.com/photo-1616627458535-7a84cae51ddf"],
    price: 28999,
    stock: 18,
    category: "Home Appliance"
  },
  {
    name: "Amazon Echo Dot (5th Gen)",
    description: "Smart speaker with Alexa voice assistant and improved sound.",
    image: ["https://images.unsplash.com/photo-1606813909055-6a5c6e2e5a32"],
    price: 4999,
    stock: 150,
    category: "Electronics"
  }
];

module.exports = {data : sampleProducts};