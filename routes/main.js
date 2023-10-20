const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
const Category = require('../models/Category')
const User = require('../models/User')

router.get('/', function (req, res) {

    console.log(req.session)
    res.render('site/index');

});

// router.get('/admin', function (req, res) {
//     res.render('admin/index');

// });

router.get('/blog', function (req, res) {
    Post.find({}).populate({ path: 'author', model: User }).sort({ $natural: -1 }).lean().then(posts => {
        // Category.find({}).lean().then(category =>{
        //     res.render('site/blog',{posts:posts,categories:category})//?????
        // })
        Category.aggregate([
            {
                $lookup: {
                    from: 'posts',//collection,tablo
                    localField: '_id', //categories
                    foreignField: 'category',
                    as: 'posts'
                }
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    num_of_posts: { $size: '$posts' }
                }
            }
        ]).then(category => {
            res.render('site/blog', { posts: posts, categories: category })
        })

    })

    //res.render('site/blog');
});

router.get('/contact', (req, res) => {
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