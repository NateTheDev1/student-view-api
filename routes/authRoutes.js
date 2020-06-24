const router = require('express').Router()
const User = require('./models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.get('/', (req, res) => {
    res.status(200).send('Welcome to the authRoutes')
})



module.exports = router