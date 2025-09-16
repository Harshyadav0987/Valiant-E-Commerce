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

    price: {
        type: Number,
        required: true,
        min: 0,
    },

    stock: {
        type: Number,
        required: true,
        min: 0,
    },

    category : String,
    //Here i will add vendor  later

    //vendor: { type: Schema.Types.ObjectId, ref: "User" }


});

const Product = mongoose.model("Product",productSchema);
module.exports = Product;