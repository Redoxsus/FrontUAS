const express = require('express');
const router = express.Router();
const pool = require('../db');

// Endpoint for subscribing
router.post('/subscribe', async (req, res) => {
    const { email } = req.body;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO subscribers (email) VALUES ($1) RETURNING *', 
            [email]
        );
        res.status(201).json({ message: 'Subscription successful', subscriber: result.rows[0] });
    } catch (err) {
        console.log(err);
        if (err.code === '23505') { // Duplicate email
            return res.status(409).json({ error: 'Email already subscribed' });
        }
        res.status(500).json({ error: 'Server error during subscription' });
    }
});

module.exports = router;