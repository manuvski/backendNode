const express = require('express')
const bodyParser = require('body-parser')
const marsRoutes = require('./src/routes/mars.js')
const syncApi = require ('./src/routes/syncApi')
const connectToDb = require('./src/services/db')
const userRouter = require('./src/routes/users.js')
const authRoutes = require('./src/routes/auth')
const dotenv = require('dotenv')
const {ensureAuthentication} = require('./src/middelware/auth')

dotenv.config()

const startApp = async () => {
    const app = express()
    const port = 8000

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({
        extended: true
    }))

    app.use(ensureAuthentication)
    app.get('/', (request, response) => {
        response.json('Aquí estoy')
    })

    app.use('/mars', marsRoutes)
    app.use('/syncApi', syncApi)
    app.use('/users', userRouter)
    app.use('/auth', authRoutes)


try {
    await connectToDb()
    app.listen(port, () => {
        console.log('APP running on port ' + port)
    })
} catch {
    process.exit(1)
}

}

startApp()
