import mongoose from "mongoose";

const categoryShema = mongoose.Schema(
  {
    name: String,
    desc: String,
    img: String,
    products: [{ type: mongoose.Types.ObjectId, ref: "Product" }],
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("Category", categoryShema);
