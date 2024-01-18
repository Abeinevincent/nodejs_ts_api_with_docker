"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwtUtils_1 = require("../utils/jwtUtils");
const userController_1 = require("../controllers/userController");
const userRoutes = (router) => {
    // Route for creating a new user
    router.post("/users/create", userController_1.createUser);
    //   Route for logging in a user
    router.post("/users/login", userController_1.loginUser);
    // Route for getting all users (only accessible by admin)
    router.get("/users/all", jwtUtils_1.verifyTokenAndAdmin, userController_1.getAllUsers);
    // Route for updating a user (protected, only account owner or admin)
    router.put("/users/update/:id", jwtUtils_1.verifyTokenAndAuthorization, userController_1.updateUser);
    // Route for deleting a user (protected, only accessible by admin)
    router.delete("/users/delete/:id", jwtUtils_1.verifyTokenAndAuthorization, userController_1.deleteUser);
};
exports.default = userRoutes;
//# sourceMappingURL=userRoute.js.map