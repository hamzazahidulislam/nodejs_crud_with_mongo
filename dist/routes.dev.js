"use strict";

var router = require('express').Router();

var _require = require('./controllers'),
    getAllContact = _require.getAllContact,
    getSingleContact = _require.getSingleContact,
    createContact = _require.createContact,
    updateContact = _require.updateContact,
    deleteContact = _require.deleteContact;

router.get('/', getAllContact);
router.get('/:id', getSingleContact);
router.get('/delete/:id', deleteContact);
router.post('/', createContact);
router.put('/:id', updateContact); // router.delete('/:id', deleteContact)

module.exports = router;