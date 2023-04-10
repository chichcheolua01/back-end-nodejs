import Joi from "joi";

export const signupSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Bạn chưa nhập tên người dùng!",
    "any.required": "Bạn chưa nhập tên người dùng!",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "Bạn chưa nhập email!",
    "any.required": "Bạn chưa nhập email!",
    "string.email": "Email bạn nhập chưa đúng định dạng!",
  }),
  password: Joi.string().min(6).required().messages({
    "string.empty": "Bạn chưa nhập mật khẩu!",
    "any.required": "Bạn chưa nhập mật khẩu!",
    "string.min": "Mật khẩu phải dài hơn {#limit} kí tự!",
  }),
  confirmPassword: Joi.string().valid(Joi.ref("password")).messages({
    "string.empty": "Bạn chưa xác thực mật khẩu!",
    "any.required": "Bạn chưa xác thực mật khẩu!",
    "any.only": "Mật khẩu xác thực không đúng!",
  }),
});

export const signinSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Bạn chưa nhập email!",
    "any.required": "Bạn chưa nhập email!",
    "string.email": "Email bạn nhập chưa đúng định dạng!",
  }),
  password: Joi.string().min(6).required().messages({
    "string.empty": "Bạn chưa nhập mật khẩu!",
    "any.required": "Bạn chưa nhập mật khẩu!",
    "string.min": "Mật khẩu phải dài hơn {#limit} kí tự!",
  }),
});
