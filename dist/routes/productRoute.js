"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwtUtils_1 = require("../utils/jwtUtils");
const productController_1 = require("../controllers/productController");
const productRoutes = (router) => {
    // Route for getting all products
    router.get("/products/all", productController_1.getAllProducts);
    // Route for creating a new product (protected, only accessible by admin)
    router.post("/products/create", jwtUtils_1.verifyTokenAndAdmin, productController_1.createProduct);
    // Route for getting a product by ID
    router.get("/products/:productId", jwtUtils_1.verifyToken, productController_1.getProductById);
    // Route for updating a product by ID (protected, only accessible by admin)
    router.put("/products/update/:productId", jwtUtils_1.verifyTokenAndAdmin, productController_1.updateProduct);
    // Route for deleting a product by ID (protected, only accessible by admin)
    router.delete("/products/delete/:productId", jwtUtils_1.verifyTokenAndAdmin, productController_1.deleteProduct);
};
exports.default = productRoutes;
//# sourceMappingURL=productRoute.js.map