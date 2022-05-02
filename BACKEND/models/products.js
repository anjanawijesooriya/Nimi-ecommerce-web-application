const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Products = new Schema ({
    productName: {
        type: String,
        required: true,
    },
    productDescrip: {
        type: String,
        required: true,
    },
    productCategory: {
        type: String,
        required: true,
    },
    productPrice: {
        type: Number,
        required: true,
    },
    qty: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    dateAdded: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
});

const newProduct = mongoose.model("product", Products); //create database collection
module.exports = newProduct;