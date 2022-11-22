// This file holds the Business-Logic layer, interacting with Data Layer

const Location = require('./locations.model')

function findAll () {
	return Location.find();
}

module.exports.findAll = findAll

