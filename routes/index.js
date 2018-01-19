const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.render('home')
})
router.get('/budget', (req, res) => {
  res.render('budget/budget')
})

module.exports = router