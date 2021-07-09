const router = require('express').Router();
let Contact = require('../models/contact_msg.model');
let Bug = require('../models/bug_msg.model');

router.post('send_msg', async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const subject = req.body.subject;
    const message = req.body.message;

    const newContact = new Contact({
        name,
        email,
        subject,
        message
    });

    await newContact.save()
    .then(() => {
        res.json("Request Sent")
    }).catch((err) => {
        res.status(500).json("Error", err);
    });
});

router.post('send_report', async (req, res) => {
    const email = req.body.email;
    const bug = req.body.bug;
    const info = req.body.info;

    const newBug = new Bug({
        email,
        bug,
        info
    });

    await newBug.save()
    .then(() => {
        res.json("Request Sent")
    }).catch((err) => {
        res.status(500).json("Error", err);
    });
});

module.exports = router;