import Joi from "joi";

export const updateUserDataValidation = (req,res,next) => {
    const schema = Joi.object({
        firstName:Joi.string().min(1).max(15),
        middleName:Joi.string().min(1).max(15),
        lastName:Joi.string().min(1).max(15),
        email:Joi.string().email(),
        phoneNumber:Joi.number().min(9000000000).max(9999999999),
        age:Joi.number(),
        gender:Joi.string().valid('Male','Female','Other'),
        location:Joi.string().min(1).max(50),
        password:Joi.string().min(8),
    })

    const {error} = schema.validate(req.body) 
    if(error) {
        return res.status(500).json({
            message : "Bad Request",
            Error : error.details[0].message,
            success : false
        })
    }
    next();
}