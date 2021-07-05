const router = require('express').Router();

// router.get('/predictions', checkAuth, (req, res) => {
//     res.render();
// });

// router.get('/site_manage', checkAuth, (req, res) => {
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

function checkRole(req,res,next){
    if(req.user.isAdmin){
        return next();
    }

    res.redirect('/deliver');
}

module.exports = router;