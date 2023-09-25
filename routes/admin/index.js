const express = require('express')
const router = express.Router()
const Category = require('../../models/Category')




router.get('/', (req, res) => {

    res.render('admin/index')

})

router.get('/categories', (req, res) => {

    //res.render('admin/categories')

   Category.find({}).sort({$natural:-1}).lean().then(category =>{
     res.render('admin/categories' , {categories:category})
   })

})

router.post('/categories', (req, res) => {
  
    Category.create(req.body).then((error,category) =>{

     
       
           res.redirect('categories')
    
    }) 

})

router.delete('/categories/:id', (req, res) => {

Category.findByIdAndRemove({_id:req.params.id}).then(()=>{
    res.redirect('/admin/categories')
})

})


module.exports = router