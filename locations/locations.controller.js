// This file is used to map API calls (Presentation Layer) with the
// Business-Logic layer

const router = require('express').Router()
const locationsService = require('./locations.service')

router.get('/locations', async (req, res) => {
	const allLocations = await locationsService.findAll();
	res.json(allLocations)
})



module.exports = router
