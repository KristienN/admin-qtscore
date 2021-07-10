const router = require('express').Router();
const passport = require('passport');
let Prediction = require('../models/prediction.model')

router.get('/home', checkAuth, async (req, res)=>{
    const predictions = await Prediction.find();
    res.render('home', {data: predictions, msg: null});
});

router.get('/add_prediction', checkAuth, (req,res) =>{
    res.render('add_prediction');
});

router.get('/update_prediction', checkAuth, async (req,res) =>{
    const id = req.query.id;
    const prediction = await Prediction.findById(id);
    res.render('update_prediction', {data: prediction});
});


function checkAuth(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }

    res.redirect('/');
}

module.exports = router;