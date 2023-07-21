const router = require('express').Router()
const { User } = require('../../models')

// route to get all users - no populate
router.get('/', async (req, res) => {
    try {
        const data = await User.find()
        res.json(data)
    } catch (err) {
        res.status(500).json(err)
    }
});

// route to get a User by Id - populate thoughts, and friends
router.get('/:id', async (req, res) => {
    try {
        const data = await User.findById(req.params.id).populate('thoughts').populate('friends')
        res.json(data)
    } catch (err) {
        res.statis(500).json(err)
    }
});

// route to create a user using request body
router.post('/', async (req, res) => {
    try {
        const data = await User.create(req.body)
        res.json(data)
    } catch (err) {
        res.status(500).json(err)
    }
});

// route to update a user by ID
router.put('/:id', async (req, res) => {
    try {
        const data = await User.updateOne({ _id: req.params.id }, { $set: req.body })
        res.json(data)
    } catch (err) {
        res.status(500).json(err)
    }
});

// route to delete user by ID
router.delete('/:id', async (req, res) => {
    try {
        const data = await User.findOneAndDelete({ _id: req.params.id })
        res.json(data)
    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router;