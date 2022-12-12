const Location = require('./locations.model')

function findAll () {
	return Location.find();
}

async function findLocation(id){
	const location = await Location.findById(id);
	if(!location) throw new Error ("Location not found :(")
	return location
}

async function deleteOne(id){
	const location = await findLocation(id)
	return location.remove
	//return Location.findOneAndDelete( {_id : id});
}

async function addLocation(data){
	const instance = new Location(data)
	return instance.save()

}

async function updateLocation(id, update){
	return Location.updateOne({ _id: id }, update);
}

module.exports.findAll = findAll
module.exports.findLocation = findLocation
module.exports.deleteOne = deleteOne;
module.exports.addLocation = addLocation;
module.exports.updateLocation = updateLocation;
