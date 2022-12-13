const User = require('./users.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');


const salt = 10
async function register (username,password){
    const hash = await bcrypt.hash(password,salt)
    const new_user = new User({username, password:hash})
    return await new_user.save()
}

async function checkPassword(username, password){
    const user = await User.findOne({username})
    if (!user) throw new Error("No user")
    const checking = await bcrypt.compare(password, user.password)
    return checking
}

async function findOne(id){
    const user = await User.findById(id)
    if (!user) throw new Error("User not found")
    return user
}

async function updateUser(id, update){
    await User.findOneAndUpdate(id, update)
    return User.findOne(id)
}

async function deleteUser(id){
    const user = await findOne(id)
    return user.remove()
}

async function findAll () {
    const users = await User.find()
    if (!users) throw new Error("Users not found")
    return users
}

async function generateTokenAndSaveUser(user) {
    const authToken = jwt.sign({ sub : user._id.toString() }, process.env.JWT_SECRET)
    user.authToken = authToken
    await user.save();
    return authToken;
}

module.exports = {
    register,
    checkPassword,
    findOne,
    updateUser,
    deleteUser,
    findAll,
    generateTokenAndSaveUser}
