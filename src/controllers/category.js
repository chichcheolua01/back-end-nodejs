import Category from "../models/category";

export const createCategory = async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    return res
      .status(200)
      .json({ message: "Tạo danh mục thành công!", newCategory });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const getCategories = async (req, res) => {
  try {
    const data = await Category.find().populate("products");
    return res
      .status(200)
      .json({ message: "Đã tìm thấy danh mục!", data });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const getCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Category.findById(id).populate("products");
    if (!data) {
      return res.status(400).json({ message: "No category was found!" });
    }
    return res.status(200).json({ message: "Category was found!", data });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
