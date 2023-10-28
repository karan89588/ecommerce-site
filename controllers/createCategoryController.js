import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";
import productModel from "../models/productModel.js";

export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.send({ msg: "Name required" });
    }
    const category = await categoryModel.findOne({ name: name });
    if (category) {
      return res.send({ success: false, msg: "Category Already Exist" });
    }
    const id = await new categoryModel({
      name: name,
      slug: slugify(name),
    }).save();
    return res.send({
      success: true,
      msg: "Category Registered Successfully",
    });
  } catch (error) {
    return res.send({ success: false, msg: "Opps Error Occur." });
  }
};

export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    const category = await categoryModel.findByIdAndUpdate(
      id,
      { name: name, slug: slugify(name) },
      { new: true }
    );
    return res.send({ success: true, msg: "Updated Successfully.", category });
  } catch (error) {
    return res.send({ success: false, msg: "Opps Error" });
  }
};

export const categoriesController = async (req, res) => {
  try {
    const categories = await categoryModel.find({});
    return res.send({ success: true, msg: "ALL Received", categories });
  } catch (error) {
    return res.send({ success: false, msg: "Opps error", error });
  }
};

export const categoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    return res.send({ success: true, msg: "Found", category });
  } catch (error) {
    return res.send({
      success: false,
      msg: "Opps Error",
    });
  }
};

export const deleteoneController = async (req, res) => {
  try {
    const { id } = req.params;
    //console.log(id);
    const s = await categoryModel.findByIdAndDelete(id);
    //console.log(s);
    return res.send({
      success: true,
      msg: "Deleted Successfully",
    });
  } catch (error) {
    return res.send({
      success: false,
      msg: "Opps Error",
    });
  }
};

export const categoryproductsController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    const product = await productModel
      .find({ category: category })
      .select("-photo");
    return res.send({
      success: true,
      msg: "Products Found",
      product,
    });
  } catch (error) {
    console.log(error);
    return res.send({
      success: false,
      msg: "Error in Fetching products of category.",
      error,
    });
  }
};
