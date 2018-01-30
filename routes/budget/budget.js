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
	let data = { description: req.body.description, value: req.body.value }
	Budget.findOne({ owner_id: req.user._id, month: req.query.month }, (err, budget) => {
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
router.get('/budget/:id/:type/:id_item/edit', middleware.isLoggedIn, (req, res) => {
	Budget.findOne({owner_id: req.user._id, month: req.query.month }, (err, budget) => {
		if (err) {
			console.log(err)
		} else {
			let item = {}
			budget[req.params.type].forEach((current) => {
				if (current._id.equals(req.params.id_item)) {
					item = current
				}
			})
			res.render('budget/editBudget', { budget: budget, item: item, type: req.params.type })
		}
	})
})
router.put('/budget/:id/:type/:id_item', middleware.isLoggedIn, (req, res) => {
	Budget.findById(req.params.id, (err, budget) => {
		if (err) {
			console.log(err)
		} else {
			let item = req.body.item
			budget[req.params.type].forEach((current, index) => {
				if (current._id.equals(req.params.id_item)) {
					current.description = item.description
					current.value = item.value
					budget.save()
				}
			})
		}
		res.redirect(`/budget/month?month=${budget.month}`)
	})
})
router.delete('/budget/:id/:type/:id_item', middleware.isLoggedIn, (req, res) => {
	Budget.findById(req.params.id, (err, budget) => {
		if (err) {
			console.log(err)
		} else {
			let removeIndex;
			budget[req.params.type].forEach((current, index) => {
				if (current._id.equals(req.params.id_item)) {
					removeIndex = index
				}
			})
			console.log(removeIndex)
			budget[req.params.type].splice(removeIndex, 1)
			budget.save()
		}
		res.redirect(`/budget/month?month=${budget.month}`)
	})
})
module.exports = router;