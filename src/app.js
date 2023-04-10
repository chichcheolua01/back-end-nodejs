import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import productRouters from "./routers/product";
import authRouters from "./routers/auth";
import categoryRouters from "./routers/category";
import fileRouters from "./routers/uploadImage"

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api", productRouters);
app.use("/api", categoryRouters);
app.use("/api", authRouters);
app.use("/api", fileRouters)
mongoose.connect("mongodb://127.0.0.1:27017/we17301");

export const viteNodeApp = app;
