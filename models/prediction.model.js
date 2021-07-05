const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const predictionSchema = new Schema({
    home_team : {type: String, required: true},
    away_team : {type: String, required: true},
    home_score : {type: String, required: true},
    away_score : {type: String, required: true},
}, {timestamps: true});

const Prediction = mongoose.model('Prediction', predictionSchema);

module.exports = Prediction;