import { comparingPassword, hashingPassword } from "../helpers/authHelper.js";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userMOdel.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, phone, role, address, password, answer } = req.body;

    if (name === "") {
      return res.send({
        success: false,
        error: "Name not found",
      });
    }
    if (email === "") {
      return res.send({
        success: false,
        error: "Email not found",
      });
    }
    if (phone === "") {
      return res.send({
        success: false,
        error: "Phone not found",
      });
    }
    if (password === "") {
      return res.send({
        success: false,
        error: "Password not found",
      });
    }
    if (toString(role) === "") {
      return res.send({
        success: false,
        error: "Role not found",
      });
    }
    if (address === "") {
      return res.send({
        success: false,
        error: "Address not found",
      });
    }
    //console.log(name, role, password, email, address, phone);
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.send({
        success: true,
        msg: "Users Already Exists",
      });
    }

    const hashedPassword = await hashingPassword(password);
    const user = await userModel({
      name: name,
      role: 0,
      email: email,
      password: hashedPassword,
      phone: phone,
      address: address,
      answer: answer,
    }).save();

    return res.send({
      success: true,
      msg: "User Registered Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      msg: "Error in registering",
      error: error,
    });
  }
};

export const loginController = async (req, res) => {
  //console.log(req.body);
  const { email, password } = req.body;
  if (!email) {
    return res.send({
      success: false,
      msg: "Email Required",
    });
  }
  if (!password) {
    return res.send({
      success: false,
      msg: "Password Required",
    });
  }
  const user = await userModel.findOne({ email: email });
  if (!user) {
    return res.send({
      success: false,
      msg: "Email Not Registered",
    });
  }
  const match = await comparingPassword(password, user.password);
  if (!match) {
    return res.send({
      success: false,
      msg: "Password Incorrect",
    });
  }
  const token = JWT.sign({ _id: user._id }, process.env.jwt_secrete, {
    expiresIn: "7d",
  });
  res.send({
    success: true,
    msg: "Login Successfully",
    user: {
      name: user.name,
      email: user.email,
      password: user.password,
      address: user.address,
      phone: user.phone,
      role: user.role,
    },
    token: token,
  });
};

export const forgetpasswordController = async (req, res) => {
  const { email, answer, newpassword } = req.body;
  if (!email) {
    return res.send({ success: false, msg: "Email Required" });
  }
  if (!answer) {
    return res.send({ success: false, msg: "Answer Required" });
  }
  if (!newpassword) {
    return res.send({ success: false, msg: "New Password Required" });
  }
  const user = await userModel.findOne({ email, answer });
  if (!user) {
    return res.send({ success: false, msg: "Wrong Email or password" });
  }
  const hashed = await hashingPassword(newpassword);
  await userModel.findByIdAndUpdate(user._id, { password: hashed });
  return res.send({ success: true, msg: "Password Updated Successfully." });
};

export const testController = async (req, res) => {
  res.send("Protected Route");
};

export const profileUpdateController = async (req, res) => {
  try {
    const { name, password, address, phone, email } = req.body;
    const user = await userModel.findById(req.user._id);
    if (password && password.length > 6) {
      return res.send({
        success: false,
        msg: "Password must be of length less than 6",
      });
    }
    const hashing = password ? await hashingPassword(password) : undefined;
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashing || user.password,
        phone: phone || user.phone,
        address: address || user.address,
        email: email || user.email,
      },
      { new: true }
    );
    return res.send({
      success: true,
      msg: "Profile Updated Successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.log(error);
    return res.send({
      success: false,
      msg: "Error in updating profile.",
      error,
    });
  }
};

export const getOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name");
    return res.send({
      success: true,
      msg: "Order Received",
      orders,
    });
  } catch (error) {
    console.log("Error here ", error);
    res.send({
      success: false,
      msg: "Error in Geting order details",
      error,
    });
  }
};
export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("products", "-photo")
      .populate("buyer", "name")
      .sort({ creadtedAt: "-1" });
    return res.send({
      success: true,
      msg: "Order Received",
      orders,
    });
  } catch (error) {
    console.log("Error here ", error);
    res.send({
      success: false,
      msg: "Error in Geting order details",
      error,
    });
  }
};
export const orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const order = await orderModel.findByIdAndUpdate(orderId, { status });
    return res.send({
      success: true,
      msg: "Status Changed",
      status,
    });
  } catch (error) {
    console.log("Error here ", error);
    res.send({
      success: false,
      msg: "Error in Geting order details",
      error,
    });
  }
};
