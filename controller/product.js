
import Product from "../model/Product.js";
import User from "../model/User.js";

export const addProduct = async (req, res) => {
    try {
        const { title, price, category, image, description } = req.body;
        console.log("***" , req.body);
        const existing_product = await Product.findOne({ title: title, price: price, category: category, image: image, description: description });
        if (existing_product) {
            return res.status(200).json({ data: existing_product, message: "This product is already added in the database." })
        }

        const existing_user = await User.findById(req.user._id);
        if (!existing_user) {
            return res.status(404).json({ message: "User not found" });
        }
        const newProduct = new Product({ title, price, category, image, description, author: req.user._id });
        console.log(newProduct);
        const savedProduct = await newProduct.save();
        if (!savedProduct) {
            return res.status(500).json({ message: "Product could not be added" });
        }

        console.log("***", await savedProduct.populate("author"));
        return res.status(201).json({ data: savedProduct, message: "Product Added " });
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
}


export const getAllProducts = async (req, res) => {
    try {
        const allProducts = await Product.find({ is_deleted: false });
        return res.status(200).json({ data: allProducts, message: "All Products Retrieved" });
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findOne({ _id: id, is_deleted: false });
        if (!product || product.length === 0) {
            return res.status(404).json({ message: "Product not found" });
        }
        else {
            return res.status(200).json({ data: product, message: "Found the product" });
        }
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

export const updateProduct = async (req, res) => {
    try {
        const { product_id, ...updatedValues } = req.body;
        const user_id = req.user._id;
        const product = await Product.findById(product_id);

        //checking if the product to be updated is present in db

        if (!product || product.length === 0) {
            return res.status(404).json({ message: "Product not found" });
        }

        //checking if current user is author 

        if (product.author.toString() !== user_id) {

            console.log("Author of product:", product.author.toString());
            console.log("User trying to edit:", user_id);
            return res.status(403).json({ message: "Not authorized to update." });


        }

        //proceed to update the product

        const updatedProduct = await Product.findOneAndUpdate({ _id: product_id, is_deleted: false }, updatedValues, { new: true, runValidators: true });
        if (!updatedProduct) {
            return res.status(500).json({ message: "Not updated" });
        }

        return res.status(200).json({ data: updatedProduct, message: "Product updated successfully" });



    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const softDeleteProduct = async (req, res) => {
    try {
        const { product_id } = req.body;
        const user_id = req.user._id;
        const user_role = req.user.role;
        const product = await Product.findById(product_id);
        if (!product || product.length === 0) {
            return res.status(404).json({ message: "Product not found !" });
        }
        if (product.author.toString() === user_id || user_role === "admin") {
            const deletedProduct = await Product.findOneAndUpdate({ _id: product_id, is_deleted: false }, { is_deleted: true });
            if (!deletedProduct) {
                return res.status(500).json({ message: "Deletion failed" });
            }
            return res.status(200).json({ data: deletedProduct, message: "Product Deleted Successfully" });
        }
        return res.status(403).json({ message: "Not authorized to delete this object." });


    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

// export const hardDeleteProduct = async (req, res) =>{
//     try{
//         const { product_id } = req.body;
//         const del_prod = await Product.findByIdAndDelete(product_id);
//         if(!del_prod){
//             res.status(404).json({message : "Product to be deleted not found"});
//         }
//         else{
//             res.status(200).json({data : del_prod, message : "Product successfully deleted "});
//         }

//     }
//     catch(err){
//         res.status(500).json({error : err.message});
//     }
// }


// export const getEmployeeById = (req, res) => {
//     const { id } = req.params;
//     const employee = data.find(e => e.emp_id === id);
//     if (!employee) {
//         res.send({message : "Employee not found"});
//     } else {
//         res.status(200).json({ data: employee, message: `Details of employee ${id} is sent` });
//     }
// }

