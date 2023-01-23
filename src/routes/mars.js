const router = require('express').Router()
const { getMarsList, getMarsById, createMars, updateMars, removeMars } = require('../controllers/mars')


router.get('/', async (request, response) => {
    try {
        const mars = await getMarsList()
        response.status(200).json(mars)
    } catch (error) {
        response.status(500)
    }
})

router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params
        const mars = await getMarsById(id)
        response.status(200).json(mars)
    } catch (error) {
        response.status(500)
    }
})

router.post('/', async (request, response) => {
    try {
        const data = request.body
        const mars = await createMars(data)
        response.status(200).json(mars)
    } catch (error) {
        response.status(500)
    }
})

router.put('/:id', async (request, response) => {
    try {
        const { id } = request.params
        const data = request.body
        const mars = await updateMars(id, data)
        response.status(200).json(mars)
    } catch (error) {
        response.status(500)
    }
})

router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params
        await removeMars(id)
        response.status(200).json(true)
    } catch (error) {
        response.status(500)
    }
})

module.exports = router