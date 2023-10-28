import fs from "fs";
import productModel from "../models/productModel.js";
import slugify from "slugify";
import braintree from "braintree";
import orderModel from "../models/orderModel.js";

var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "n3rdxjq37msvz9rx",
  publicKey: "5czqqcrdjpcvkcfy",
  privateKey: "3bee2a8e891b81291b1600b0aaa516b5",
});

export const createProductController = async (req, res) => {
  try {
    //console.log("Pass0");
    const { name, price, description, category, quantity } = req.fields;
    //console.log("Pass11");
    const { photo } = req.files;
    //console.log("Pass1");
    switch (true) {
      case !name:
        return res.send({ success: false, msg: "Name Required" });
      case !price:
        return res.send({ success: false, msg: "Price Required" });
      case !description:
        return res.send({ success: false, msg: "Description Required" });
      case !category:
        return res.send({ success: false, msg: "Category Required" });
      case !quantity:
        return res.send({ success: false, msg: "Quantity Required" });
      case !photo || photo.size > 1000000:
        return res.send({
          success: false,
          msg: "Photo Required and should in the range 1MB.",
        });
    }
    //console.log("Pass2");
    const product = await productModel({
      ...req.fields,
      slug: slugify(name),
      shipping: false,
    });
    //console.log("Pass22");
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    //console.log("Pass222");
    await product.save();
    //console.log("Pass3");
    return res.send({
      success: true,
      msg: "Product Registered Successfully",
      product,
    });
  } catch (error) {
    return res.send({
      success: false,
      msg: "Opps Error",
      error,
    });
  }
};
export const getProductController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(10)
      .sort({ createdAt: -1 });
    return res.send({
      success: true,
      msg: "Top 10 Products",
      products,
    });
  } catch (error) {
    return res.send({
      success: false,
      msg: "Opps Error",
      error,
    });
  }
};
export const getSingleProductController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    return res.send({ success: true, msg: "Found", product });
  } catch (error) {
    return res.send({ success: true, msg: "Opps Error", error });
  }
};
export const getPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id).select("photo");
    if (product.photo.data) {
      res.set("Content-Type", product.photo.contentType);
      return res.send(product.photo.data);
    }
  } catch (error) {
    return res.send({ success: true, msg: "Opps Error", error });
  }
};
export const deleteProductController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.id).select("-photo");
    return res.send({ success: true, msg: "Product Delete Successfully." });
  } catch (error) {
    return res.send({ success: true, msg: "Opps Error", error });
  }
};
export const updateProductController = async (req, res) => {
  try {
    const { name, price, description, category, quantity } = req.fields;
    const { photo } = req.files;
    const product = await productModel.findByIdAndUpdate(req.params.id, {
      ...req.fields,
      slug: slugify(name),
    });
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save();
    return res.send({
      success: true,
      msg: "Product Updated Successfully",
      product,
    });
  } catch (error) {
    return res.send({ success: false, msg: "Opps Error", error });
  }
};
export const ProductFilter = async (req, res) => {
  try {
    const { all, priceC } = req.body;
    let args = {};
    if (all.length > 0) args.category = all;
    if (priceC.length > 0) args.price = { $gte: priceC[0], $lte: priceC[1] };
    const products = await productModel.find(args).select("-photo");
    return res.send({ success: true, msg: "Fetched", products });
  } catch (error) {
    console.log(error);
    return res.send({ success: false, msg: "Error in Fetching" });
  }
};
export const productCountController = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.send({
      success: true,
      msg: "Found",
      total: total,
    });
  } catch (error) {
    console.log(error);
    res.send({
      success: false,
      msg: "Error in count",
      error,
    });
  }
};

export const productListController = async (req, res) => {
  try {
    const productPerPage = 6;
    const page = req.params.page ? req.params.page : 1;
    const list = await productModel
      .find({})
      .select("-photo")
      .skip((page - 1) * productPerPage)
      .limit(productPerPage)
      .sort({ createdAt: -1 });
    res.send({
      success: true,
      msg: "Found",
      list,
    });
  } catch (error) {
    console.log(error);
    res.send({
      success: false,
      msg: "Error in finding products",
      error,
    });
  }
};

export const searchController = async (req, res) => {
  try {
    const { keyword } = req.params;
    //console.log(keyword);
    const data = await productModel
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");
    res.send({
      success: true,
      msg: "Search Found",
      data,
    });
  } catch (error) {
    console.log(error);
    res.send({
      success: false,
      msg: "Error in search",
      error,
    });
  }
};
export const relatedProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await productModel
      .find({
        category: cid,
        _id: { $ne: pid },
      })
      .select("-photo")
      .limit(3);
    res.send({
      success: true,
      msg: "Related Product Found",
      products,
    });
  } catch (error) {
    console.log(error);
    res.send({
      success: false,
      msg: "Error in fetching related Products.",
    });
  }
};

export const braintreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.send(err);
      } else {
        res.send(response);
      }
    });
  } catch (error) {
    console.log(error);
    return res.send({
      success: false,
      msg: "Error in Token generation",
      error,
    });
  }
};
export const braintreePaymentController = async (req, res) => {
  try {
    //console.log("pass1");
    const { Cart, nonce } = req.body;
    let total = 0;
    Cart.map((i) => (total += i.price * i.quantityTaken));
    await gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      (err, result) => {
        if (result) {
          //console.log("pass2");
          const order = new orderModel({
            products: Cart,
            payment: result,
            buyer: req.user._id,
          }).save();
          //console.log("pass3");
        } else {
          //console.log("pass4");
          res.send({
            success: false,
            msg: "Transaction fails",
            err,
          });
        }
      }
    );
    //console.log("pass5");
    return res.send({ success: true });
  } catch (error) {
    //console.log("pass6");
    console.log(error);
  }
};
export const updateQuantityController = async (req, res) => {
  try {
    const { pid } = req.params;
    const { newQuantity } = req.body;
    const product = await productModel.findByIdAndUpdate(pid, {
      quantity: newQuantity,
    });
    res.send({
      success: true,
      msg: "Quantity Updated Successfully",
      newQuantity,
    });
  } catch (error) {
    console.log(error);
    res.send({
      success: false,
      msg: "Error in Decrementing the quantity.",
      error,
    });
  }
};
