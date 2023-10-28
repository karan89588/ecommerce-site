import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";
import {
  ProductFilter,
  braintreePaymentController,
  braintreeTokenController,
  createProductController,
  deleteProductController,
  getPhotoController,
  getProductController,
  getSingleProductController,
  productCountController,
  productListController,
  relatedProductController,
  searchController,
  updateProductController,
  updateQuantityController,
} from "../controllers/productController.js";
const router = express.Router();

router.post(
  "/create-product",
  requireSignIn,
  formidable(),
  isAdmin,
  createProductController
);

router.get("/get-products", getProductController);
router.get("/get-product/:slug", getSingleProductController);
router.get("/get-photo/:id", getPhotoController);
router.delete(
  "/delete-product/:id",
  requireSignIn,
  isAdmin,
  deleteProductController
);
router.put(
  "/update-product/:id",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);
router.post("/filter", requireSignIn, ProductFilter);
router.get("/product-count", productCountController);
router.get("/product-list/:page", productListController);
router.get("/search/:keyword", searchController);
router.get("/related-product/:pid/:cid", relatedProductController);
router.get("/braintree/token", braintreeTokenController);
router.post("/braintree/payment", requireSignIn, braintreePaymentController);
router.put("/update-quantity/:pid", requireSignIn, updateQuantityController);
export default router;
