const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')
const schema = new mongoose.Schema({
  username: String,
  password: String,
  budgets: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Budget'
  }]
}, {usePushEach: true})
schema.plugin(passportLocalMongoose)
module.exports = mongoose.model('User', schema)