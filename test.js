const mongoose = require('mongoose');

const Post = require('./models/Post')

mongoose.connect('mongodb://127.0.0.1:27017/nodeblog_test_db')
  .then(() => console.log('Connected!'));


  // Post.create({
  //   title:'İkinci post başlığım',
  //   content:'İkinci Post içeriği, lorem ipsum text'
  // }).then((error,post) =>{console.log(error,post)}) 

  // Post.find({
  //   title:'İkinci post başlığım'
  // }).then((error,post)=>{console.log(error,post)})

  // Post.find().then((error,post)=>{console.log(error,post)})

  // Post.findById('650ab50b87758d7c08a25733')
  // .then((error,post)=>{console.log(error,post)})

  
  // Post.findByIdAndUpdate('650ab50b87758d7c08a25733',{
  // title:'1. Postum'  
  // }).then((error,post)=>{console.log(error,post)})

  // Post.findByIdAndDelete('650ab525002ff90d1698e298')
  // .then((error,post)=>{console.log(error,post)})