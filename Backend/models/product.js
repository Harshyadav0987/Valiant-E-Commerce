const mongoose = require( "mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema ({
    name :{
        type : String,
        required : true,
    },

    description : String,
    image :[
        {type : String,}
    ],
    price:Number,
    stock : Number,
    category : String,
    //Here i will add vendor  later

});

const Product = mongoose.model("Product",productSchema);
module.exports = Product;