const uuid = require('uuid')
const path = require('path')
const {Item, Item_Info} = require('../models/models')
const ApiError = require('../error/apiError')
const fs = require('fs')



class ItemController {
    async create(req, res, next) {
       try {
            const name = req.body.name
            const price = req.body.price
            const brandId = req.body.brandId
            const typeId = req.body.typeId
            const img = req.files.img
            const description = req.body.description

            // Создаем уникальное название для img 
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))


            // Создаем item
            const item = await Item.create({name, price, brandId, typeId, img: fileName, description})

            return res.json(item)

       } catch(error) {
            next(ApiError.badRequest(error.message))
       }
    }

    async getAll(req, res) {
        const brandId = req.query.brandId
        const typeId = req.query.typeId
        let limit = req.query.limit || 9
        let page = req.query.page || 1
        // Расчет количества выводимых item
        let offset = page * limit - limit

        // С помощью limit и offset выводим нужное количество
        let items
        if (!brandId && !typeId) {
            items = await Item.findAndCountAll({limit, offset})
        } 
        if (brandId && !typeId) {
            items = await Item.findAndCountAll({where: {brandId}, limit, offset})
        }
        if (!brandId && typeId) {
            items = await Item.findAndCountAll({where: {typeId}, limit, offset})
        }
        if (brandId && typeId) {
            items = await Item.findAndCountAll({where: {typeId, brandId}, limit, offset})
        }
        return res.json(items)
    }

    async getOne(req, res) {
        const id = req.params.id
        const item = await Item.findOne(
            {
                where: {id},
            }
        )
        return res.json(item)
    }

    async deleteItem(req, res) {
        const ID = +req.params.id
        const {img} = await Item.findOne({where: {id: ID}})
        
        fs.unlink('./static/' + img, (err) => {
            if (err) throw err;
        });
        await Item.destroy({where: {id: ID}})
        return res.json({message: `item ${ID} is delete`})
    }

}

module.exports = new ItemController()