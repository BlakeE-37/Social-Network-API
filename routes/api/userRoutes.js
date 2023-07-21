const router = require('express').Router()
const mongoose = require('mongoose');
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

// ---------- User Friend Routes ----------

// route to add friend to a user
router.post('/:userId/friends/:friendId', async (req, res) => {
    const newObject = new mongoose.Types.ObjectId(req.params.friendId)
    try {
        // convert the id from params to an object
        const data = await User.updateOne({ _id: req.params.userId },
            { $push: { friends: newObject } });
        res.json(data)
    } catch (err) {
        res.status(500).json(err)
    }
});

// route to remove a friend from the friend array
router.delete('/:userId/friends/:friendId', async (req, res) => {
    const newObject = new mongoose.Types.ObjectId(req.params.friendId)
    try {
        const data = await User.updateOne({ _id: req.params.userId },
            { $pull: { friends: newObject } });
        res.json(data)
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router;