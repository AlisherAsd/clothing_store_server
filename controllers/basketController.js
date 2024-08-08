const { where } = require('sequelize')
const {Basket, Basket_Item} = require('../models/models')


class BasketController {
    async get(req, res) {
        const ID = req.params.id
        const {id} = await Basket.findOne({where: {userId: ID}})
        const Basket_Items = await Basket_Item.findAll({where: {basketId: id}})
        return res.json(Basket_Items)
    }

    async addItem(req, res) {
        const user_id = req.body.user_id
        const item_id = req.body.item_id
        const {id} = await Basket.findOne({where: {userId: user_id}})
        const Basket_Items = await Basket_Item.create({basketId: id, itemId: item_id})
        return res.json(Basket_Items)
    }

    async deleteItem(req, res) {
        console.log('\n\n\n\n', req, '\n\n\n\n')
        const user_id = req.body.user_id
        const item_id = req.body.item_id
        const {id} = await Basket.findOne({where: {userId: user_id}})
        await Basket_Item.destroy({where: {basketId: id, itemId: item_id}})
        return res.json({message: `itembasket ${item_id} is delete`})
    }
}

module.exports = new BasketController()