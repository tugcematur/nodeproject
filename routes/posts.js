const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
const path = require('path')
const Category = require('../models/Category')
const User = require('../models/User')


router.get('/new', (req, res) => {
    if (!req.session.userId) {
        res.redirect('/users/login')
    }
    else {
        Category.find({}).lean().then(category => {
            res.render('site/addpost', { categories: category })
        })
    }


    /* res.render('site/addpost')*/
})

router.get('/:id', (req, res) => {
    Post.findById(req.params.id).populate({ path: 'author', model: User }).lean().then(post => {
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
            Post.find({}).populate({ path: 'author', model: User }).sort({ $natural: -1 }).lean().then(posts => {

                res.render('site/post', { post: post, categories: category, posts: posts })
            })

        })

    })
    // console.log(req.params)
    // res.render('site/addpost')
})

router.post('/test', (req, res) => {
    //res.send('TEST OK')   
    let post_image = req.files.post_image
    post_image.mv(path.resolve(__dirname, '../public/img/postimages', post_image.name))

    // Post.create(req.body)
    Post.create({
        ...req.body,
        post_image: `/img/postimages/${post_image.name}`,
        author: req.session.userId

    })

    req.session.sessionFlash = {
        type: 'alert alert-success',
        message: 'Postunuz başarılı bir şekilde oluşturuldu'
    }




    res.redirect('/blog')
    console.log(req.body)
    console.log(req.files.post_image.name)
})


router.get('/category/:categoryId', (req, res) => {
    Post.find({ category: req.params.categoryId }).populate({ path: 'category', model: Category }).sort({ $natural: -1 }).lean().populate({ path: 'author', model: User }).lean().then(posts => {
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
        ]).then(categories => {
            res.render('site/blog', { posts: posts, categories: categories })
        })

    })

})




function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};
//çalışmıyor
router.get("/search", (req, res) => {
    if (req.query.look) {
        const regex = new RegExp(escapeRegex(req.query.look), 'gi');
        Post.find({ "title": regex }).populate({ path: 'author', model: User }).sort({ $natural: -1 }).lean().then(posts => {
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
            ]).then(categories => {
                res.render('site/blog', { posts: posts, categories: categories })
            })
        })
    }
})
module.exports = router