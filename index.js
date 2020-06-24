const express = require('express');
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const cors = require('cors')
const mongoose = require('mongoose')

dotenv.config()

const app = express()
app.use(cors())
app.use(bodyParser.json())

// ROUTES
const authRoutes = require('./routes/authRoutes')
app.use('/api/user', authRoutes)

const uri = `mongodb+srv://Admin:adminpassword@student-view-b2hrb.mongodb.net/student-view?retryWrites=true&w=majority`

// MONGOOSE SETUP HERE
mongoose.connect(
    // process.env.DB_CONNECTION,
    uri,
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
    () => {
      console.log("Db Connected");
    }
  );


app.get('/', (req, res) => {
    res.status(200).send('Welcome to the student view API')
})  

// const port = process.env.PORT || 5000
app.listen(5000, () => {
    console.log('Listening on ' + 5000)
})