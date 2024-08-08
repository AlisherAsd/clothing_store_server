const jwt = require('jsonwebtoken')

module.exports = function(role) {
    return function(req, res, next) {
        if (req.method === 'OPTIONS') {
            next()
        }
        try {
            // Bearer sadas45s3dafdsa
            const token = req.headers.authorization.split(' ')[1]
            if (!token) {
                res.status(401).json({message: "Пользователь не авторизован"})
            }
            // Раскодируем jwt токен
            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            if (decoded.role !== role) {
                res.status(403).json({message: "Доступ не разрешен"})
            }
            req.user = decoded 
            next()
        } catch (error) {
            res.status(401).json({message: error})
        }
    } 
}