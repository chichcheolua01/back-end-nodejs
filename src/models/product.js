import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productShema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    categoryId: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
    },
    img: String,
    desc: String,
  },
  { timestamps: true, versionKey: false }
);
productShema.plugin(mongoosePaginate);

export default mongoose.model("Product", productShema);
