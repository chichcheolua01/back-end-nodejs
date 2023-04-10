import Joi from "joi";
import Product from "../models/product";
import Category from "../models/category";

const productSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  categoryId: Joi.string().required(),
  img: Joi.string().required(),
  desc: Joi.string()
});

export const getProducts = async (req, res) => {
  const {
    _sort = "price",
    _order = "desc",
    _limit = 100,
  } = req.query;
  const option = {
    limit: _limit,
    sort: {
      [_sort]: _order == "desc" ? -1 : 1,
    },
  };
  try {
    const {
      docs: data,
      totalDocs,
      totalPages,
    } = await Product.paginate({}, option);
    if (!data) {
      return res.status(400).json({ message: "Không có sản phẩm nào!" });
    }
    return res
      .status(200)
      .json({ message: "Đã tìm thấy sản phẩm!", data, totalDocs, totalPages });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const getProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id }).populate({
      path: "categoryId",
      select: "-__v",
    });
    if (!product) {
      return res.status(400).json({ message: "Không có sản phẩm nào!" });
    }
    return res.status(200).json({ message: "Đã tìm thấy sản phẩm!", product });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const removeProduct = async (req, res) => {
  try {
    const removedProduct = await Product.findByIdAndDelete(req.params.id);
    return res
      .status(200)
      .json({ message: "Xóa sản phẩm thành công!", removedProduct });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const body = req.body;
    const { error } = productSchema.validate(body);
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({ message: errors });
    }
    const product = await Product.create(body);
    await Category.findByIdAndUpdate(product.categoryId, {
      $addToSet: {
        products: product._id,
      },
    });
    if (!product) {
      return res.status(400).json({ message: "Cannot create product!" });
    }
    return res.status(200).json({ message: "Product created", product });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const { error } = productSchema.validate(body);
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({ message: errors });
    }
    const data = await Product.findByIdAndUpdate({ _id: id }, body, {
      new: true,
    });
    if (!data) {
      return res.status(400).json({ message: "Cập nhật không thành công!" });
    }
    return res.status(200).json({ message: "Cập nhật thành công!", data });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};