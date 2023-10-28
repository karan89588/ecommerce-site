import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  categoriesController,
  categoryController,
  categoryproductsController,
  createCategoryController,
  deleteoneController,
  updateCategoryController,
} from "../controllers/createCategoryController.js";

const router = express.Router();

router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);

router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);

router.get("/get-categories/", categoriesController);
router.get("/getcategory/:slug", categoryController);
router.get("/category-products/:slug", categoryproductsController);
router.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  deleteoneController
);

export default router;
