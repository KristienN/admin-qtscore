const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bug_msgSchema = new Schema({
    email: {type: String, required: true},
    bug: {type: String, required: true},
    info: {type: String, required: true},
});

const Bug_msg = mongoose.model("Bug_msg", bug_msgSchema);
module.exports = Bug_msg;