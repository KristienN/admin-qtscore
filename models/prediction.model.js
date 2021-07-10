const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const predictionSchema = new Schema({
    country: {type: String, required: true},
    home_team : {type: String, required: true},
    away_team : {type: String, required: true},
    tip:{type: String, required: true},
    date:{type: Date, required: true}
}, {timestamps: true});

const Prediction = mongoose.model('Prediction', predictionSchema);

module.exports = Prediction;