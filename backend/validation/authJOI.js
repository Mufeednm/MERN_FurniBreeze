import Joi from "joi";


//  joi validation 

export const authJoi = Joi.object({
  username: Joi.string().min(3).max(30).required(),

  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }).lowercase().required().trim(),
  password: Joi.string().min(8).required().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).trim(),

});
// joi validation for product
export const productJoi = Joi.object({
  title: Joi.string().min(3).max(30).required(),
  description:Joi.string().min(3).max(50).required(),
  price:Joi.number().positive().required(),
  category:Joi.string().min(3).max(50).required(),
})