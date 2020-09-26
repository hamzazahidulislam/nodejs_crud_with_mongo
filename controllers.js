const Contact = require('./Contact')

exports.getAllContact = (req, res) => {
    Contact.find()
        .then(contacts => {
            res.render('index', {
                contacts,
                error: {}
            })
        })
        .catch(e => {
            console.log(e)
            res.json({
                message: "Error Occured gett all contact can't find error"
            })
        })
}
exports.getSingleContact = (req, res) => {
    let {
        id
    } = req.params
    Contact.findById(id)
        .then(contact => {
            res.json(contact)
        })
        .catch(e => {
            console.log(e)
            res.json({
                message: "Error Occured get single contact can't find error"
            })
        })
}
exports.createContact = (req, res) => {
    let {
        name,
        phone,
        email,
        id
    } = req.body
    let error = {}
    if (!name) {
        error.name = "Please Provide Your Name"
    }
    if (!phone) {
        error.phone = "Please Provide Your Phone"
    }
    if (!email) {
        error.email = "Please Provide Your Eamil"
    }

    let isError = Object.keys(error).length > 0
    console.log("is error object ", isError)
    console.log("form erro ", error)
    if (isError) {
        Contact.find()
            .then(contacts => {
                res.render('index', {
                    contacts,
                    error
                })
            })
            .catch(e => {
                console.log(e)
                res.json({
                    message: "Create user error"
                })
            })
    }
    if (id) {
        console.log('i am entri in id')
        Contact.findOneAndUpdate({
                _id: id
            }, {
                $set: {
                    name,
                    email,
                    phone
                }
            })
            .then(() => {
                Contact.find()
                    .then(contacts => {
                        res.render('index', {
                            contacts,
                            error: {}
                        })
                    })
            })
            .catch(e => {
                console.log(e)
                res.json({
                    message: "Update user error"
                })
            })
    } else {
        let contact = new Contact({
            name,
            email,
            phone
        })
        contact.save()
            .then(c => {
                Contact.find()
                    .then(contacts => {
                        return res.render('index', {
                            contacts,
                            error: {}
                        })
                    })
            })
            .catch(e => {
                console.log(e)
                res.json({
                    message: "Create user error"
                })
            })
    }
    console.log('vai ata amr id', id)

}
exports.updateContact = (req, res) => {
    let {
        name,
        email,
        phone
    } = req.body
    let {
        id
    } = req.params

    Contact.findOneAndUpdate({
            _id: id
        }, {
            $set: {
                name,
                email,
                phone
            }
        }, {
            new: true
        })
        .then(contact => {
            res.json(contact)
        })
        .catch(e => {
            console.log(e)
            res.json({
                message: "Error Update Contact"
            })
        })
}
exports.deleteContact = (req, res) => {
    let {
        id
    } = req.params
    Contact.findOneAndDelete({
            _id: id
        })
        .then(() => {
            Contact.find()
                .then(contacts => {
                    res.render('index', {
                        contacts,
                        error: {}
                    })
                })
        })
        .catch(e => {
            console.log(e)
            res.json({
                message: "Error data delete error"
            })
        })
}