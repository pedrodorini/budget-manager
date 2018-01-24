const express = require('express')
const router = express.Router()
const middleware = require('../../middlewares/middlewares')
const User = require('../../models/user')
const Budget = require('../../models/budget')

router.get('/budget', middleware.isLoggedIn, (req, res) => {
	res.render('budget/selectBudget')
})
router.get('/budget/:month', middleware.isLoggedIn, (req, res) => {
	console.log(req.query)
	Budget.findOne({owner_id: req.user._id, month: req.query.month }, (err, budget) => {
		console.log({owner_id: req.user._id, month: req.query.month})
		if (err) {
			console.log(err)
		} else {
			console.log(budget)
			res.render(`budget/budget`, {budget: budget})
		}
	})
})
router.post('/budget', middleware.isLoggedIn, (req, res) => {
	let data = {description: req.body.description, value: req.body.value}
	Budget.findOne({ owner_id: req.user._id, month: req.body.month }, (err, budget) => {
		if (err || !budget) {
			let newBudget = {
				owner_id: req.user._id,
				month: req.body.month,
				incomes: [{}],
				expenses: [{}]
			}
			req.body.type === 'income' ? newBudget.incomes.push(data) : newBudget.expenses.push(data)
			Budget.create(newBudget, (err, budget) => {
				if (err) {
					console.log(err)
				} else {
					res.redirect(`/budget/month?month=${req.body.month}`)
				}
			})
		} else {
			req.body.type === 'income' ? budget.incomes.push(data) : budget.expenses.push(data)
			budget.save()
			res.redirect(`/budget/month?month=${req.body.month}`)
		}
	})
})
router.put('/budget/:id/edit', (req, res) => {
	Budget.findByIdAndUpdate(req.params.id, req.body.budget, (err, budget) => {
		if (err) {
			console.log(err)
		} else {
			res.redirect(`/budget/month?month=${req.body.month}`)
		}
	})
})
module.exports = router;