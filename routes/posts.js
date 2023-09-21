const express= require('express')
const router = express.Router()
const Post = require('../models/Post')
const path =  require('path')




router.get('/new',(req,res)=>{
    res.render('site/addpost')
})

router.get('/:id',(req,res)=>{
    Post.findById(req.params.id).lean().then(p =>{
        res.render('site/post',{post:p})
    })
   // console.log(req.params)
   // res.render('site/addpost')
})

router.post('/test',(req,res)=>{
    //res.send('TEST OK')   
    let post_image = req.files.post_image
    post_image.mv(path.resolve(__dirname,'../public/img/postimages',post_image.name))
   
   // Post.create(req.body)
   Post.create({
    ...req.body,
    post_image: `/img/postimages/${post_image.name}`

   })
   res.redirect('/')
  console.log(req.body)
  console.log(req.files.post_image.name)
})

module.exports = router