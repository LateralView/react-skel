let mongoose = require('mongoose')
let Schema = mongoose.Schema
let md5 = require('md5')

let comment = new Schema({
  email: {
    type: String,
    trim: true,
    required: 'Email is required.'
  },
  text: String,
  albumId: {
    type: String,
    trim: true,
    required: 'The AlbumId is required'
  }
})

comment.set('toJSON', {
  virtuals: true
})

comment.virtual('avatar').get(function() {
  return `https://www.gravatar.com/avatar/${md5(this.email)}`
})

module.exports = mongoose.model('Comment', comment)
