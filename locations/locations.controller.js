// This file is used to map API calls (Presentation Layer) with the
// Business-Logic layer

const router = require('express').Router()
const locationsService = require('./locations.service')
const { default: mongoose } = require('mongoose')
const Location = require('./locations.model')

router.get('/', (req, res) => {
	return res.status(200).send("Hello World")
})
router.get('/locations', async (req, res) => {
	const allLocations = await locationsService.findAll();
	res.json(allLocations)
})

router.get('/locations/:id', async(req,res) => {
	try {
		const location = await locationsService.findOne(req.params['id'])
		return res.status(200).send(location)
	} catch (e) {
		if (e.message === "Location not found") return res.status(404).send("Location not found")
		return res.status(400).send("Bad Request")
	}
})



module.exports = router
