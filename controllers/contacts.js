const { Contact }  = require('../models/contacts');
const { HttpError, ctrlWrapper } = require('../helpers');

const listContacts = async (_, res) => {
   const result = await Contact.find();
    res.json(result); 
}

const getContactById = async (req, res) => {
    const {contactId } = req.params;
    const result = await Contact.findById(contactId);
    if (!result) {
     throw HttpError(404,'Not found')
    }
    res.json(result)
}

const addContact = async (req, res) => {
    const result = await Contact.create(req.body);
    res.status(201).json(result);
}

const removeContact = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndRemove(contactId);
    if (!result) {
      throw HttpError(404, 'Not found');
    }
    res.status(200).json({
    message: 'сontact deleted'
   }); 
}

const updateContact =async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new:true});
    if (!result) {
      throw HttpError(404, 'Not found');
    }
    res.json(result);
}
const updateFavorite = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new:true});
    if (!result) {
      throw HttpError(404, 'Not found');
    }
    res.json(result);
}


module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  removeContact: ctrlWrapper(removeContact),
  addContact: ctrlWrapper(addContact),
  updateContact: ctrlWrapper(updateContact),
  updateFavorite: ctrlWrapper(updateFavorite)
}