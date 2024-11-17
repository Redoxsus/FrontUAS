const express = require('express');
const router = express.Router();
const pool = require('../db');  // Assuming your DB connection pool is set up here

// Endpoint untuk menambahkan subscriber
router.post('/subscribe', async (req, res) => {
    const { email } = req.body;

    // Validasi email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }

    try {
        // Menambahkan subscriber ke database
        const result = await pool.query(
            'INSERT INTO subscribers (email) VALUES ($1) RETURNING *', 
            [email]
        );
        res.status(201).json({ message: 'Subscription successful', subscriber: result.rows[0] });
    } catch (err) {
        console.log(err);  // Log error untuk debugging

        // Cek jika error kode adalah '23505' (duplicate email)
        if (err.code === '23505') {
            return res.status(409).json({ error: 'Email already subscribed' });
        }
        // Untuk error lain
        res.status(500).json({ error: 'Something went wrong' });
    }
});


module.exports = router;
