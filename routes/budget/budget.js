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
router.get('/budget/:id/:type/:id_item/edit', (req, res) => {
	Budget.findById(req.params.id, (err, budget) => {
		if (err) {
			console.log(err)
		} else {
			let item = {}
			if (req.params.type === 'expense') {
				for (expense of budget.expenses) {
					if (expense._id.equals(req.params.id_item)) {
						item = expense
					}
				}
			} else {
				for (income of budget.incomes) {
					if (income._id.equals(req.params.id_item)) {
						item = income
					}
				}
			}
			res.render('budget/editBudget', { budget: budget, item: item, type: req.params.type })
		}
	})
})
router.put('/budget/:id/:type/:id_item', (req, res) => {
	Budget.findById(req.params.id, (err, budget) => {
		if (err) {
			console.log(err)
		} else {
			let item = req.body.item
			console.log(item)
			if (req.params.type === 'expense') {
				for (expense of budget.expenses) {
					if (expense._id.equals(req.params.id_item)) {
						console.log(expense)
						expense.description = item.description
						expense.value = item.value
						budget.save()
					}
				}
			} else {
				for (income of budget.incomes) {
					if (income._id.equals(req.params.id_item)) {
						income.description = item.description
						income.value = item.value
						budget.save()
					}
				}
			}
			res.render('budget/budget', { budget: budget})
		}
	})
})
module.exports = router;