const User = require('../models/users')

const getUserList = async () => {
    const user = await User.find()
    return user
}

const getUserById = async (id) => {
    const user = await User.findById(id)
    return user
}

const getUserByEmail = async (email) => {
    const user = await User.findOne({email})
    return user
}

const createUser = async ({ name, email, password }) => {
    const user = new User({ name, email, password })
    return user.save()
}

const updateUser = async (id, data) => {
    const user = await getUserById(id)
    await user.updateOne(data)

    return getUserById(id)
}

const removeUser = async (id) => {
    await User.findByIdAndDelete(id)

    return true
}

const toggleTaskToFavorite = async ({id, nasaId}) => {
    const user = await getUserById(id)
    const currentFavList = user.favorites
    let newFavsList = currentFavList

    const existed = currentFavList.includes(nasaId)
    

    if (existed) {
        newFavsList = currentFavList.filter(item => item !== nasaId)
    } else {
        newFavsList.push(nasaId)
    }

    await User.findByIdAndUpdate(id, { favorites: newFavsList})

    let userUpdated = await getUserById(id)
    userUpdated = JSON.parse(JSON.stringify(userUpdated))

    const {password, salt, ...userUpdated_} = userUpdated

    return userUpdated_
}

const getFavoritesByUser = async ({id, }) => {
const user = await getUserById(id)
return user.favorites

}





module.exports = {
    getUserList,
    getUserById,
    getUserByEmail,
    createUser,
    updateUser,
    removeUser,
    toggleTaskToFavorite,
    getFavoritesByUser
}