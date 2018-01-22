const mongoose = require('mongoose')
const schema = new mongoose.Schema({
  owner_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  month: String,
  incomes: [{
    description: String,
    value: Number
  }],
  expenses: [{
    description: String,
    value: Number
  }]
}, {usePushEach: true})
module.exports = mongoose.model('Budget', schema)