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
})

module.exports = router;