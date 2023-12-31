const router = require('express').Router()
const { Thought, User } = require('../../models')

// get route to retrive all thoughts
router.get('/', async (req, res) => {
    try {
        const data = await Thought.find()
        res.json(data)
    } catch (err) {
        res.status(500).json(err)
    }
});

// get route that gets a thought by its ID
router.get('/:id', async (req, res) => {
    try {
        const data = await Thought.findById(req.params.id)
        res.json(data)
    } catch (err) {
        res.status(500).json(err)
    }
});

// post route to create a thought and add it to the users thoughts array
router.post('/', async (req, res) => {
    try {
        // create the thought
        const data = await Thought.create({ username: req.body.username, thoughtText: req.body.thoughtText });

        // update the user thoughts array
        await User.updateOne({ username: req.body.username },
            { $push: { thoughts: data._id } })

        res.json(data)
    } catch (err) {
        res.status(500).json(err)
    }
});

// route to update a thought by its ID
router.put('/:id', async (req, res) => {
    try {
        const data = await Thought.updateOne({ _id: req.params.id }, { $set: req.body })
        res.json(data)
    } catch (err) {
        res.status(500).json(err)
    }
});

// delete route to remove a thought
router.delete('/:id', async (req, res) => {
    try {
        const data = await Thought.findOneAndDelete({ _id: req.params.id })
        res.json(data)
    } catch (err) {
        res.status(500).json(err)
    }
});

// ---------- Thought Reaction Routes ----------

// post route to create a reaction
router.post('/:id/reactions', async (req, res) => {
    try {
        const data = await Thought.updateOne({ _id: req.params.id }, { $push: { reactions: req.body } })
        res.json(data)
    } catch (err) {
        res.status(500).json(err)
    }
});

// delete route to remove a reaction from a thought
router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
    try {
        const data = await Thought.updateOne({ _id: req.params.thoughtId }, { $pull: { reactions: { _id: req.params.reactionId } } })
        res.json(data)
    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router