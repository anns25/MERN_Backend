import { Router } from "express"
import { addProduct, getAllProducts, getProductById, softDeleteProduct, updateProduct } from "../../controller/product.js";
import { authCheck } from "../../middlewares/auth.js";
import { productValidationRules } from "../../validators/productValidator.js";
import { validate } from "../../middlewares/validate.js";
import { check } from "express-validator";
import { updateProductValidationRules } from "../../validators/updateProductValidator.js";

const product = Router();

product.post('/add', authCheck, productValidationRules, validate, addProduct);
product.get('/all', getAllProducts);

product.get('/viewProduct/:id', getProductById);

product.patch('/updateProduct', authCheck, updateProductValidationRules, validate, updateProduct);

product.delete('/deleteProduct', authCheck, [
    check('product_id')
        .notEmpty()
        .withMessage('Product id is required')
], validate, softDeleteProduct);

export default product