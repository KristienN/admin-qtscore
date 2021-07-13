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
    const tip = req.body.tip;
    const country = req.body.country;
    const date = req.body.date;
    const page = req.body.page;
    

    if(tip == "Other"){
        tip = req.body.other;
    }

    const newPrediction = Prediction({
        country,
        home_team,
        away_team,
        tip,
        date,
        page
    });

    await newPrediction.save()
    .then(async () => {
        res.redirect('../home');
    })
    .catch(err => res.status(500).json("Error", err));
});

router.put("/update/:id", async (req,res)=>{
    const id = req.params.id;
    await Prediction.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
    .then(async(data) => {
        res.json("Updated")
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