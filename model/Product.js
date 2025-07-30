import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            minlength: [3, 'Title must be at least 3 characters long']
        },
        price: {
            type : Number,
            required : true
        },
        category: {
            type : String,
            required : true
        },
        image: {
            type : String,
            required : true
        },
        description: {
            type : String,
            minlength: [10, 'Description must be at least 10 characters long']
        },
        is_deleted : {
            type : Boolean,
            default : false
        },
        author : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User",
            required : true
        }
    },

    {
        timestamps : true
    }
);

const Product = mongoose.model('Product', productSchema);

export default Product