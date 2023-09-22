//const path =  require('path')
const express = require('express')
var exphbs = require('express-handlebars');
const app = express()
const port = 3000

const hostname = '127.0.0.1'

const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const generateDatee = require('./helpers/generateDate').generateDate
const expressSession = require('express-session')
const MongoStore = require('connect-mongo');


mongoose.connect('mongodb://127.0.0.1:27017/nodeblogdb')
  .then(() => console.log('Connected!'));


app.use(expressSession({
  secret: 'test',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: 'mongodb://127.0.0.1:27017/nodeblogdb' })
}))

//Flash Message Middleware
app.use((req, res, next) => {
  res.locals.sessionFlash = req.session.sessionFlash
  delete req.session.sessionFlash
  next()

})

app.use(fileUpload())

app.use(express.static('public')) //static  dosyalarımız public in içinde 



app.engine('handlebars', exphbs({ helpers: { generateDate: generateDatee } }));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// const myMiddleware = (req,res,next) =>{
//   console.log('Tugceeeee')
//   next()
// }

// app.use('/blog',myMiddleware)

app.use((req, res, next) => {
  const { userId } = req.session

  if (userId) {
    res.locals = {
      displayLink: true
    }
  }

  else {
    res.locals = {
      displayLink: false
    }
  }

  next()
})

const main = require('./routes/main')
const posts = require('./routes/posts')
const users = require('./routes/users')
const admin = require('./routes/admin/index')
app.use('/', main)
app.use('/posts', posts)
app.use('/users', users)
app.use('/admin', admin)


// app.get('/' ,(req,res) => {
//     res.sendFile(path.resolve(__dirname,'site/index.html'))
// })

// app.get('/about' ,(req,res) => {
//     res.sendFile(path.resolve(__dirname,'site/about.html'))
// })


// app.get('/blog' ,(req,res) => {
//     res.sendFile(path.resolve(__dirname,'site/blog.html'))
// })


app.listen(port, () => {
  console.log(`server calisiyor, http://${hostname}:${port}}`)
})