const router = require('express').Router()
const { Thought } = require('../../models')

// get route to retrive all thoughts
router.get('/', async (req, res) => {
    try {
        const data = await Thought.find()
        res.json(data)
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router