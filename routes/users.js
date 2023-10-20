const express= require('express')
const router = express.Router()
const User  = require('../models/User')


router.get('/register',(req,res)=>{
    res.render('site/register')
})

router.post('/register',(req,res)=>{
    User.create(req.body).then((error,user)=>{
 
        req.session.sessionFlash ={
            type:'alert alert-danger',
            message:'Kullanıcı başarıyla oluşturuldu'
        }
        res.redirect('/users/login')
        console.log(req.body)
    })
  //  res.render('site/register')
})

router.get('/login',(req,res)=>{
    res.render('site/login')
})

router.post('/login',(req,res)=>{

    const {email,password} = req.body
    User.findOne({email} )
    .then((user,error)=>{
        if(user){
            if(user.password == password)
            {
                //USER SESSION
                req.session.userId = user._id
                res.redirect('/')
            }

            else{
                
            
                res.redirect('/users/login')
            }
        }
        else{
         
            res.redirect('/users/register')
            
        }
    })
})

router.get('/logout',(req,res)=>{
    req.session.destroy(()=>{
        res.redirect('/')
    })

})

module.exports = router