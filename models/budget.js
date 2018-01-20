const mongoose = require('mongoose')
const schema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  description: String,
  month: String,
  expenses: [{
    value: Number
  }],
  incomes: [{
    value: Number
  }]
}, {usePushEach: true})
module.exports = mongoose.model('Budget', schema)