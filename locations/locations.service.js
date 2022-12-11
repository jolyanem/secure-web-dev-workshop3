

const Location = require('./locations.model')

function findAll () {
	return Location.find();
}

async function findOne(id){
	const location = await Location.findById(id);
	if(!location) throw new Error ("Location not found :(")
	return location
}




module.exports.findAll = findAll
module.exports.findOne = findOne

