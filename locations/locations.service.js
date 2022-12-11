const Location = require('./locations.model')

function findAll () {
	return Location.find();
}

async function findOne(id){
	const location = await Location.findById(id);
	if(!location) throw new Error ("Location not found :(")
	return location
}

async function deleteOne(id){
	const location = await findOne(id)
	return location.remove
	//return Location.findOneAndDelete( {_id : id});
}

module.exports.findAll = findAll
module.exports.findOne = findOne
module.exports.deleteOne = deleteOne;
