const ApiError = require('../error/apiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Basket} = require('../models/models')


const generateJWT = (id, email, role) => {
    // Генерируем jwt токен
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}


class UserController {


    async registration(req, res, next) {

        const email = req.body.email
        const password = req.body.password
        const role = req.body.role
        if (!email || !password) {
            return next(ApiError.badRequest("Неккоректный email или пароль"))
        }
        const candidate = await User.findOne({where: {email}})

        if (candidate) {
            return next(ApiError.badRequest("Пользователь с таким email уже существует"))
        }

        // Хэшируем пароль
        const hash_password = await bcrypt.hash(password, 5)

        // Создаем пользователя с хэшированным паролем и корзину с его id
        const user = await User.create({email, password: hash_password, role})
        const basket = await Basket.create({userId: user.id})

        // Создаем jwt токен на основе его хэш пароля
        const token = generateJWT(user.id, user.password, user.role)
        return res.json({token: token})
    }

    async login(req, res, next) {
        
        const email = req.body.email
        const password = req.body.password

        const user = await User.findOne({where: {email}})


        if (!user) {
            return next(ApiError.internal("Пользователь с таким email не найден"))
        }

        // Сравниваем пароль пользователя с хэшированным
        let compare_password = bcrypt.compareSync(password, user.password)
        if (!compare_password) {
            return next(ApiError.internal("Указан еверный пароль"))
        }

        // Создаем jwt токен на основе его хэш пароля
        const token = generateJWT(user.id, user.email, user.role)
        return res.json({token})
    }

    async check(req, res) {
        const token = generateJWT(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }

    async deleteUser(req, res) {
        const ID = +req.params.id
        await User.destroy({where: {id: ID}})
        return res.json({message: `User ${ID} is delete`})
    }

}

module.exports = new UserController()