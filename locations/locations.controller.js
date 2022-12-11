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
		const location = await locationsService.findLocation(req.params['id'])
		return res.status(200).send(location)

})

router.delete('/locations/:id', async (req,res)=>{
	const location = await locationsService.deleteOne(req.params.id)
	return res.status(200).send(location)
})

router.post('/locations', async (req,res, next) =>{
	const locations = await locationsService.addLocation({...req.body})
	return res.status(201).send(locations)

})

router.put('/locations/:id', async (req,res)=>{
	const location = await locationsService.updateLocation(req.params.id, {...req.body, endDate:new Date(req.body.endDate), startDate: new Date(req.body.startDate)})
	return res.status(200).send(location)

})

module.exports = router
