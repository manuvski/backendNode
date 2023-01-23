const Mars = require('../models/mars')

const getMarsList = async () => {
    const mars = await Mars.find()
    return mars
}

const getMarsById = async (id) => {
    const mars = await Mars.findById(id)
    return mars
}

const createMars = async ({ nasaId, sol, image }) => {
    const mars = new Mars({ nasaId, sol, image })
    return mars.save()
}

const updateMars = async (id, data) => {
    const mars = await getMarsById(id)
    await mars.updateOne(data)

    return getMarsById(id)
}

const removeMars = async (id) => {
    await Mars.findByIdAndDelete(id)

    return true
}

module.exports = {
    getMarsList,
    getMarsById,
    createMars,
    updateMars,
    removeMars
}