const mongoose = require('mongoose')
var Schema = mongoose.Schema

var PostSchema = new Schema({
  title: String,
  dir: String
})

var Post = mongoose.model('Post', PostSchema)
module.exports = Post
