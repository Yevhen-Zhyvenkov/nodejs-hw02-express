const express = require('express')
const router = express.Router()
const ctrl = require('../../controllers/contacts');
const { validateBody, isValidId, authenticate } = require("../../middlewares");
const { schemas } = require("../../models/contacts");

router.get('/',authenticate, ctrl.listContacts)

router.get('/:contactId', authenticate, isValidId, ctrl.getContactById)

router.post('/', authenticate, validateBody(schemas.addSchema), ctrl.addContact)

router.delete('/:contactId',isValidId, authenticate, ctrl.removeContact);

router.put('/:contactId', isValidId, authenticate, validateBody(schemas.addSchema), ctrl.updateContact)

router.patch('/:contactId/favorite',isValidId, authenticate, validateBody(schemas.updateFavoriteSchema), ctrl.updateFavorite)

module.exports = router






