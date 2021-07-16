const router = require('express').Router();
const Prediction = require('../models/prediction.model');

router.get('/', async (req, res)=> {
    await Prediction.find()
    .then((result) => {
        res.json(result);
    }).catch(err => res.status(500).json("Error + ", err));
})

router.get('/:id', async (req, res)=> {
    let id = req.params.id
    await Prediction.findById(id)
    .then((result) => {
        res.staus(201).json(result);
    }).catch(err => res.status(500).json("Error + ", err));
})

router.post('/add', async (req, res)=> {
    let home_team = req.body.home_team;
    let away_team = req.body.away_team;
    let tip = req.body.tip;
    let country = req.body.country;
    let date = req.body.date;
    let page = req.body.page;
    

    if(tip == "other"){
        tip = req.body.other;
    }

    if(!date){
        date = new Date();
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

router.put("/update_many", async (req,res)=>{
    await Prediction.updateMany({page: 2}, {page: 1})
    .then(async(data) => {
        res.json("Switched Dates ")
    })
    .catch(err =>{
        res.status(500).json("Error: " + err);
    })
});

router.delete("/delete_many", async (req, res) => {
    await Prediction.deleteMany({page: 1})
    .then(data =>{
        res.json("Deleted");
    })
    .catch(err=>{
        res.status(500).json("Error: " + err);
    })
})

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