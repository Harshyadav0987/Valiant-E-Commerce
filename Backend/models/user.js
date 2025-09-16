const mongoose = require( "mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema ({
    name :{
        type : String,
        required : true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    orders :[],/////
    address : String,
    contact: {
        type: String,
        required: true,
        match: [/^[0-9]{10}$/, "Please enter a valid 10-digit phone number"],
    },

});

const User = mongoose.model("User",userSchema);
module.exports = User;