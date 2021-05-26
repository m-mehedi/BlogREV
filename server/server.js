const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()

const postRoutes = require('./routes/post')
const authRoutes = require('./routes/auth')


// App
const app = express()  
// Database
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
.then( () => console.log('Cloud Database is connected')) 
.catch( err => console.log(err));

// middlewares
// req > middlewares < res
app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.json())  // pass json data to js
// route middleware
app.use('/api', postRoutes)
app.use('/api', authRoutes)



// port
const port  = process.env.PORT || 8000
app.listen(port, () => console.log(`Server is running on port: ${port}`))
