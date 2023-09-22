const express= require('express')
const router = express.Router()
const Post = require('../models/Post')


router.get('/', function (req, res) {
    
    console.log(req.session)
    res.render('site/index');
   
});

// router.get('/admin', function (req, res) {
//     res.render('admin/index');
    
// });

router.get('/blog', function (req, res) {
     Post.find({}).lean().then(post=> {
         res.render('site/blog',{posts:post})//?????
       
      })
     
   //res.render('site/blog');
    });

router.get('/contact',(req,res)=>{
    res.render('site/contact')
})




// router.get('/posts/new',(req,res)=>{
//     res.render('site/addpost')
// })

// router.post('/posts/test',(req,res)=>{
//     //res.send('TEST OK')

//    console.log(req.body)
//    res.redirect('/')
// })

module.exports = router