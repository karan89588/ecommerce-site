import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgetpasswordController,
  profileUpdateController,
  getOrdersController,
  getAllOrdersController,
  orderStatusController,
} from "../controllers/authController.js";
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/register", registerController);

router.post("/login", loginController);

router.post("/forgetpassword", forgetpasswordController);

router.get("/test", requireSignIn, isAdmin, testController);

router.get("/user-auth", requireSignIn, (req, res) => {
  res.send({ ok: true });
});

router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.send({ ok: true });
});

router.put("/profile", requireSignIn, profileUpdateController);
router.get("/orders", requireSignIn, getOrdersController);
router.get("/admin-orders", requireSignIn, isAdmin, getAllOrdersController);
router.put(
  "/status-change/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);

export default router;
