const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', (req, res) => {
    res.json(User.findAll());
});

router.post('/login', async (req, res) => {
    const { username } = req.body;
    console.log("USERNAME", username)
    const user = User.findByName(username);
    if (!user) {
        try {
            const newUser = await User.create({ username });
           console.log('newUser:', newUser);
            res.status(201).json(newUser);
        } catch (err) {
            res.status(400).json({ message: err.message });
        } 
    } else {
        res.status(200).json(user);
    }
});

router.patch('/:id/score', (req, res) => {
    const { score } = req.body;
    try {
        const updatedUser = User.updateScore(req.params.id, score);
        res.json(updatedUser);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
});

module.exports = router;