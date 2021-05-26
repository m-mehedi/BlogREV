const express = require('express')
const router = express.Router()
// Import controller methods 
const { create, list, read, update, remove } = require('../controllers/post')
const { requireSignin } = require('../controllers/auth')
// routes
router.post('/post',requireSignin, create)
// get list
router.get('/posts', list)
// get single post
router.get('/post/:slug', read) // req.params.slug
// post update
router.put('/post/:slug',requireSignin, update) // req.params.slug
// post delete
router.delete('/post/:slug',requireSignin, remove) // req.params.slug

// router.get('/secret',(req, res) =>{
//     res.json({
//         data: req.user.name
//     });
// });

module.exports = router;