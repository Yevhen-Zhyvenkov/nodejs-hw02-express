const { Schema, model } = require('mongoose');
const { handleMongooseError } = require('../helpers');
const Joi = require('joi');
const emailRegexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/;

const usersSchema = new Schema(
    {
        password: {
            type: String,
            required: [true, 'Set password for user'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            match: emailRegexp,
            unique: true,
        },
        subscription: {
            type: String,
            enum: ["starter", "pro", "business"],
            default: "starter"
        },
        token: String
    },{
    versionKey: false 
}
);
usersSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required().messages({ "any.required": `missing required email field` }),
    password: Joi.string().required().messages({ "any.required": `missing required password field` }),
});

const loginSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required().messages({ "any.required": `missing required email field` }),
    password: Joi.string().required().messages({ "any.required": `missing required password field` }),
});

const schemas = {
    registerSchema,
    loginSchema,
}

const User = model("user", usersSchema);

module.exports = {
    User,
    schemas,
}