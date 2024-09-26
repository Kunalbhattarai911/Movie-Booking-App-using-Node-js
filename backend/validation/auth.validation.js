import Joi from "joi";

export const signupValidation = (req,res,next) => {
    const schema = Joi.object({
        firstName:Joi.string().min(1).max(15).required(),
        middleName:Joi.string().min(1).max(15).optional(),
        lastName:Joi.string().min(1).max(15).required(),
        email:Joi.string().email().required(),
        phoneNumber:Joi.number().min(9000000000).max(9999999999).required(),
        age:Joi.number().required(),
        gender:Joi.string().valid('Male','Female','Other').required(),
        location:Joi.string().min(1).max(50).required(),
        password:Joi.string().min(8).required(),
        role:Joi.string().valid('User','Admin','SuperAdmin').required()
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

export const signinValidation = (req,res,next) => {
    const schema = Joi.object({
        email:Joi.string().email().required(),
        password:Joi.string().min(8).required(),
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