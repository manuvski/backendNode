const userRouter = require('express').Router()
const { getUserList, getUserById, createUser, updateUser, removeUser, toggleTaskToFavorite } = require('../controllers/users')

userRouter.get('/', async (request, response) => {
    try {
        const user = await getUserList()
        response.status(200).json(user)
    } catch (error) {
        response.status(500)
    }
})

userRouter.get('/:id', async (request, response) => {
    try {
        const { id } = request.params
        const user = await getUserById(id)
        response.status(200).json(user)
    } catch (error) {
        response.status(500)
    }
})

userRouter.post('/', async (request, response) => {
    try {
        const data = request.body
        const user = await createUser(data)
        response.status(200).json(user)
    } catch (error) {
        response.status(500).json('User creation failed')
    }
})

userRouter.post('/favorites/:nasaId', async (request, response) => {
    try {
        //hay que pasarlo en body en vez de en params?
        const {nasaId} = request.params
        const user = await toggleTaskToFavorite({
            id: request.user.id,
            nasaId
        })
        response.status(200).json(user)
    } catch (error) {
        response.status(500).json('Cannot add to favorites')
    }
})

userRouter.get('/favorites/:nasaId', async (request, response) => {
    try {
        const {nasaId} = request.params
        const user = await getUserById(nasaId)
        const favorites = user.favorites
        response.status(200).json(favorites)
    } catch (error) {
        response.status(500).json('Cannot get favorites')
    }
})

userRouter.put('/:id', async (request, response) => {
    try {
        const { id } = request.params
        const data = request.body
        const user = await updateUser(id, data)
        response.status(200).json(user)
    } catch (error) {
        response.status(500)
    }
})

userRouter.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params
        await removeUser(id)
        response.status(200).json(true)
    } catch (error) {
        response.status(500)
    }
})

module.exports = userRouter