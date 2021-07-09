const router = require('express').Router();
const passport = require('passport');
let Prediction = require('../models/prediction.model')

router.get('/home', checkAuth, async (req, res)=>{
    const predictions = await Prediction.find();
    res.render('home', {data: predictions});
});

router.get('/add_prediction', checkAuth, (req,res) =>{
    res.render('add_prediction');
});

router.get('/update_prediction', checkAuth, async (req,res) =>{
    const id = req.query.id;
    const prediction = await Prediction.findById(id);
    res.render('update_prediction', {data: prediction});
});

// router.get('/predictions', checkAuth, (req, res) => {
//     res.render();
// });

// router.get('/report_bug', checkAuth, (req, res) => {
//     res.render();
// });

// router.get('/analytics', checkAuth, (req, res) => {
//     res.render();
// });


function checkAuth(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }

    res.redirect('/');
}

module.exports = router;