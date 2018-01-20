const express = require('express')
const router = express.Router()
const middleware = require('../../middlewares/middlewares')
const User = require('../../models/user')
const Budget = require('../../models/budget')

router.get('/budget', middleware.isLoggedIn, (req, res) => {
  res.render('budget/budget')
})
router.post('/budget', middleware.isLoggedIn, (req, res) => {
  let newBudget = {
    owner: req.user,
    description: req.body.description
  }
  if (req.body.type === 'income') {
    newBudget.incomes.push(req.body.value)
  } else {
    newBudget.expenses.push(req.body.value)
  }
  Budget.create
})
module.exports = router;