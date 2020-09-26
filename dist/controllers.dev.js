"use strict";

var Contact = require('./Contact');

exports.getAllContact = function (req, res) {
  Contact.find().then(function (contacts) {
    res.render('index', {
      contacts: contacts,
      error: {}
    });
  })["catch"](function (e) {
    console.log(e);
    res.json({
      message: "Error Occured gett all contact can't find error"
    });
  });
};

exports.getSingleContact = function (req, res) {
  var id = req.params.id;
  Contact.findById(id).then(function (contact) {
    res.json(contact);
  })["catch"](function (e) {
    console.log(e);
    res.json({
      message: "Error Occured get single contact can't find error"
    });
  });
};

exports.createContact = function (req, res) {
  var _req$body = req.body,
      name = _req$body.name,
      phone = _req$body.phone,
      email = _req$body.email,
      id = _req$body.id;
  var error = {};

  if (!name) {
    error.name = "Please Provide Your Name";
  }

  if (!phone) {
    error.phone = "Please Provide Your Phone";
  }

  if (!email) {
    error.email = "Please Provide Your Eamil";
  }

  var isError = Object.keys(error).length > 0;
  console.log("is error object ", isError);
  console.log("form erro ", error);

  if (isError) {
    Contact.find().then(function (contacts) {
      res.render('index', {
        contacts: contacts,
        error: error
      });
    })["catch"](function (e) {
      console.log(e);
      res.json({
        message: "Create user error"
      });
    });
  }

  if (id) {
    console.log('i am entri in id');
    Contact.findOneAndUpdate({
      _id: id
    }, {
      $set: {
        name: name,
        email: email,
        phone: phone
      }
    }).then(function () {
      Contact.find().then(function (contacts) {
        res.render('index', {
          contacts: contacts,
          error: {}
        });
      });
    })["catch"](function (e) {
      console.log(e);
      res.json({
        message: "Update user error"
      });
    });
  } else {
    var contact = new Contact({
      name: name,
      email: email,
      phone: phone
    });
    contact.save().then(function (c) {
      Contact.find().then(function (contacts) {
        return res.render('index', {
          contacts: contacts,
          error: {}
        });
      });
    })["catch"](function (e) {
      console.log(e);
      res.json({
        message: "Create user error"
      });
    });
  }

  console.log('vai ata amr id', id);
};

exports.updateContact = function (req, res) {
  var _req$body2 = req.body,
      name = _req$body2.name,
      email = _req$body2.email,
      phone = _req$body2.phone;
  var id = req.params.id;
  Contact.findOneAndUpdate({
    _id: id
  }, {
    $set: {
      name: name,
      email: email,
      phone: phone
    }
  }, {
    "new": true
  }).then(function (contact) {
    res.json(contact);
  })["catch"](function (e) {
    console.log(e);
    res.json({
      message: "Error Update Contact"
    });
  });
};

exports.deleteContact = function (req, res) {
  var id = req.params.id;
  Contact.findOneAndDelete({
    _id: id
  }).then(function () {
    Contact.find().then(function (contacts) {
      res.render('index', {
        contacts: contacts,
        error: {}
      });
    });
  })["catch"](function (e) {
    console.log(e);
    res.json({
      message: "Error data delete error"
    });
  });
};