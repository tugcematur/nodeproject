const express= require('express')
const router = express.Router()
const Post = require('../models/Post')
const path =  require('path')
const Category = require('../models/Category')
const User = require('../models/User')


router.get('/new',(req,res)=>{
    if(!req.session.userId)
    {
        res.redirect('/users/login')
    }
  else{
    Category.find({}).lean().then(category => {
        res.render('site/addpost',{categories:category})
    })
  }
    

   /* res.render('site/addpost')*/
})

router.get('/:id',(req,res)=>{
    Post.findById(req.params.id).populate({path:'author', model:User}).lean().then(p =>{
        Category.find({}).lean().then(category =>{
            res.render('site/post',{post:p, categories:category})
        })
       
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
    post_image: `/img/postimages/${post_image.name}`,
    author: req.session.userId

   })

   req.session.sessionFlash ={
    type: 'alert alert-success',
    message: 'Postunuz başarılı bir şekilde oluşturuldu'
   }


   

   res.redirect('/blog')
  console.log(req.body)
  console.log(req.files.post_image.name)
})

module.exports = router