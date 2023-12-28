import express from "express";
import userRoutes from "./userRoute";
import productRoutes from "./productRoute";
const router = express.Router();

export default (): express.Router => {
  // USER
  userRoutes(router);

  //   PRODUCT
  productRoutes(router);
  return router;
};
