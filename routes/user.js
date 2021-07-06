const router = require('express').Router();
const bcrypt = require('bcrypt');
let User = require('../models/user.model');

router.post('/add', async (req,res)=>{

    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(req.body.password, salt);
    let newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashPass,
        isAdmin: req.body.isAdmin
    });
    await newUser.save()
    .then((response)=>{
        res.json("User has been created!");
    }).catch(err => res.status(500).json(err));
  
});

router.get('/', async (req,res)=> {
    await User.find().then(result => res.json(result))
    .catch(err => res.status(500).send(err));
});

router.delete('/delete-user/:user', async (req, res)=> {
    await User.deleteOne({username: req.params.user}).then(result => res.json("Deleted"))
    .catch(err => res.status(500).send(err));
});

module.exports = router;