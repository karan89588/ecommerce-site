import JWT from "jsonwebtoken";
import userModel from "../models/userMOdel.js";
export const requireSignIn = async (req, res, next) => {
  //console.log(typeof req.headers.authorization);
  try {
    //console.log(req.headers.authorization);
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.jwt_secrete
    );
    req.user = decode;
    next();
  } catch (error) {
    console.log("Error here", error);
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    //console.log("req.user ", req.user);
    const user = await userModel.findById(req.user._id);
    //console.log(user.role, req.user._id);
    if (user.role !== 1) {
      return res.send({
        succes: true,
        msg: "Is Not admin",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.send({
      success: false,
      msg: "Not authorized user.",
    });
  }
};
