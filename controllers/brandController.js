const {Brand} = require('../models/models')
const ApiError = require('../error/apiError')

class BrandController {
    async create(req, res) {
        const name = req.body.name
        const brand = await Brand.create({name})
        return res.json(brand)
    }

    async get(req, res) {
        const brands = await Brand.findAll()
        return res.json(brands)
    }

}

module.exports = new BrandController()