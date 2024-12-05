// backend/routes/authenticateToken.js
const express = require('express');
const router = express.Router();
const pool = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');

// Setup Multer untuk menyimpan file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Folder tempat menyimpan file gambar
  },
  filename: (req, file, cb) => {
    // Menghasilkan nama file unik berdasarkan timestamp dan nama asli
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// Multer untuk memproses file gambar (gunakan file dengan field name 'profilePicture')
const upload = multer({ storage: storage });

// Middleware untuk memverifikasi token JWT
function authenticateToken(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    jwt.verify(token, 'your_jwt_secret', (err, user) => {
        if (err) return res.status(403).json({ error: 'Invalid token' });
        req.user = user;
        next();
    });
}

// Register Route
router.post('/register', async (req, res) => {
    const { email, password, firstName, lastName, dateOfBirth } = req.body;

    if (!email || !password || !firstName || !lastName || !dateOfBirth) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (existingUser.rows.length > 0) {
            return res.status(409).json({ error: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query(
            'INSERT INTO users (email, password, first_name, last_name, date_of_birth) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [email, hashedPassword, firstName, lastName, dateOfBirth]
        );

        res.status(201).json({
            message: 'Registration successful',
            user: { email: result.rows[0].email, id: result.rows[0].id }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error during registration' });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        const userResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (userResult.rows.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const user = userResult.rows[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = jwt.sign({ userId: user.id }, 'your_jwt_secret', { expiresIn: '1h' });

        res.status(200).json({
            message: 'Login successful',
            token: token,
            user: { email: user.email, id: user.id }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error during login' });
    }
});

// Get Profile
router.get('/profile', authenticateToken, async (req, res) => {
    try {
        const user = await pool.query('SELECT id, email, first_name, last_name, date_of_birth, bio, profile_picture FROM users WHERE id = $1', [req.user.userId]);
        if (user.rows.length === 0) return res.status(404).json({ error: 'User not found' });

        // Check if profile picture exists, if not, assign default image
        const profile = user.rows[0];
        if (!profile.profile_picture) {
            profile.profile_picture = 'img/default-avatar.png'; // Default image path
        }

        res.status(200).json({ profile });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch profile' });
    }
});

// Update Profile with Profile Picture
router.put('/profile', authenticateToken, upload.single('profilePicture'), async (req, res) => {
    const { firstName, lastName, bio } = req.body;
    const profilePicture = req.file ? req.file.filename : null; // Mengambil nama file yang diupload

    try {
        const result = await pool.query(
            'UPDATE users SET first_name = $1, last_name = $2, bio = $3, profile_picture = $4 WHERE id = $5 RETURNING *',
            [firstName, lastName, bio, profilePicture, req.user.userId]
        );

        res.status(200).json({ message: 'Profile updated successfully', profile: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update profile' });
    }
});

// Delete Profile (Optional)
router.delete('/profile', authenticateToken, async (req, res) => {
    try {
        await pool.query('DELETE FROM users WHERE id = $1', [req.user.userId]);
        res.status(200).json({ message: 'Profile deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete profile' });
    }
});

module.exports = router;
