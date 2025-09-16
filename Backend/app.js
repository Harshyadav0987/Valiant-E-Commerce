const express = require( "express")
const app = express();
const mongoose = require("mongoose");
const Product = require("./models/product.js")

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

// ✅ Allow only your frontend
app.use(cors({
  origin: "http://localhost:5173", // React frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, // if using cookies/auth
}));


app.get("/",(req,res)=>{
    res.send("Hello testing")
});

app.get("/home",async (req,res)=>{
    Product.find({})
        .then(products=>{
            res.json(products);
        })
        .catch(err=>{
            res.send(err);
        })
})

const port = process.env.port || 3000

app.listen(port,()=>{
    console.log(`server is live on port : http://localhost:${port}`)
})

