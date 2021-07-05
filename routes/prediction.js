const router = require('express').Router();
const Prediction = require('../models/prediction.model');

router.get('/', async (req, res)=> {
    await Prediction.find()
    .then((result) => {
        res.send(result);
    }).catch(err => res.status(500).json("Error + ", err));
})

router.post('/add', async (req, res)=> {
    const home_team = req.body.home_team;
    const away_team = req.body.away_team;
    const home_score = req.body.home_score;
    const away_score = req.body.away_score;

    const newPrediction = Prediction({
        home_team,
        away_team,
        home_score,
        away_score
    });

    await newPredicition.save()
    .then(() => res.json("Prediction added"))
    .catch(err => res.status(500).json("Error", err));
})

module.exports = router;