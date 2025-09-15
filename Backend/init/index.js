const mongoose = require("mongoose");
const initData = require("./products.js");
const Product = require ("../models/product.js");

const MONOG_URL='mongodb://127.0.0.1:27017/Valiant';

main()
    .then(()=>{
        console.log("connected to DB");
    })
    .catch((err)=>{
        console.log(err);
    });

async function main() {
    await mongoose.connect(MONOG_URL);
}


const initDB = async()=>{
    await Product.deleteMany({});
    await Product.insertMany(initData.data);
    console.log("Database sucessfullu created");
}

initDB();