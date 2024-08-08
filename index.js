require('dotenv').config()
const express = require('express')
const sequelize = require('./db')  
const models = require('./models/models.js')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/index.js')
const ErrorHandler = require('./middleware/ErrorHAndlingMiddleware.js')
const path = require('path')

const PORT = process.env.PORT || 3030


const app = express()


app.use(cors({ credentials: true, origin: true }))
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))


// url http://api/...
app.use('/api', router)

// Миддлвейр для обработки ошибок
app.use(ErrorHandler)


const start = async () => {
    try {
        // Подключение в psql через sqlize
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server run ${PORT}`))
    } catch(er) {
        console.log(er)
    }
}

start()