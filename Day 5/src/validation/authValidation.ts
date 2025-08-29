import Joi from "joi";

export const registerSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

// import Joi from "joi";

// export const productSchema = Joi.object({
//   title: Joi.string().min(3).required().messages({
//     "string.empty": "Nama produk wajib diisi",
//     "string.min": "Nama produk minimal 3 karakter",
//     "any.required": "Nama produk wajib diisi",
//   }),
//   price: Joi.number().min(0).required().messages({
//     "number.base": "Harga harus berupa angka",
//     "number.min": "Harga tidak boleh negatif",
//     "any.required": "Harga wajib diisi",
//   }),
// });