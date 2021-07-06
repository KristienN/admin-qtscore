const router = require('express').Router();
const Prediction = require('../models/prediction.model');

router.get('/', async (req, res)=> {
    await Prediction.find()
    .then((result) => {
        res.json(result);
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

    await newPrediction.save()
    .then(() => res.json("Prediction added"))
    .catch(err => res.status(500).json("Error", err));
});

router.put("/update/:id", async (req,res)=>{
    const id = req.params.id;
    await Prediction.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
    .then(data => {
        res.json("Updated Prediction")
    })
    .catch(err =>{
        res.status(500).json("Error: " + err);
    })
});

router.delete("/delete/:id", async (req, res)=>{
    const id = req.params.id;
    await Prediction.findByIdAndDelete(id)
    .then(data =>{
        res.json("Deleted");
    })
    .catch(err=>{
        res.status(500).json("Error: " + err);
    })
});

module.exports = router;