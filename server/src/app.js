const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

// Fetch all posts
app.get('/posts', (req, res) => {
  Post.find({}, 'title dir', function (error, posts) {
    if (error) { console.error('Not found') }
      res.send({
        posts: posts
      })
  }).sort({_id: -1})
})

app.listen(process.env.PORT || 8081)

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/posts')
var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error'))
db.once('open', function (callback) {
  console.log('Connection Succeeded')
})

var Post = require('../models/document')
var fs = require('fs')

// Add new post
app.post('/posts', (req, res) => {
  var db = req.db
  var title = req.body.title
  var dir = req.body.dir
  var text = req.body.text
  var newPost = new Post({
    title: title,
    dir: dir
  });

  newPost.save(function (error) {
    if (error) {
      console.log(error)
    }
    res.send({
      success: true,
      message: 'Post saved successfully!'
    })
  })

  fs.writeFile(dir, text, function (error) {
    if (error) {
      console.log(error)
    }
  })
})

// Delete a post
app.delete('/posts/:id', (req, res) => {
  var db = req.db
  Post.remove({
    _id: req.params.id
  }, function (err, post) {
    if (err) { res.send(err) }
    res.send({
      success: true
    })
  })
})

