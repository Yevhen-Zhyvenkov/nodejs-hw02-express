const { Schema, model } = require('mongoose');
const { handleMongooseError } = require('../helpers');
const Joi = require('joi');

const contactSchema = new Schema(
{
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    }
}, {
    versionKey: false 
});

contactSchema.post('save', handleMongooseError);
const Contact = model('Contact', contactSchema);

const addSchema = Joi.object({
  name: Joi.string().required().messages({ "any.required": `missing required name field` }),
  email: Joi.string().required().messages({ "any.required": `missing required email field` }),
  phone: Joi.string().required().messages({ "any.required": `missing required phone field` }),
  favorite: Joi.boolean()
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean()
    .required()
    .messages({"any.required": `missing field favorite`})
});

const schemas = {
  addSchema,
  updateFavoriteSchema
};

module.exports = { Contact, schemas};
















