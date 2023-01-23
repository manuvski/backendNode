const mongoose = require('mongoose')
// const { $where } = require('../models/mars')
const Mars = require('../models/mars')

async function getData() {

    console.log('ejecutando api')

    try {

        const response = await fetch('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=CAVbWftfNm0a5cEfG3sgeOQQjuUeHki8fBe0obkf')
        const data = await response.json()
        const results = data.photos

        const dataResults = results.map(d => ({
            nasaId: d.id,
            sol: d.sol,
            image: d.img_src
        }));

        const itemstoCreation = []
        const existedResults = await Mars.find()

        for (const item of dataResults) {
            const match = existedResults.find((existedResult) => existedResult.nasaId === item.nasaId)
            if (!match) {
                itemstoCreation.push(item)
            }
        }

        if (itemstoCreation.length > 0) {
            await Mars.insertMany(itemstoCreation)
        }

        return [...existedResults, ...itemstoCreation]

    }
    catch (error) {
        console.log('Error con la api')

    }

}

module.exports = getData