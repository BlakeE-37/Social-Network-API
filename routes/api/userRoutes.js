const router = require('express').Router()
const { User } = require('../../models')

router.get('/', async (req, res) => {
    try {
        const data = await User.find().populate('friends')
        res.json(data)
    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router;