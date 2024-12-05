// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const pool = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');

// Setup Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Folder to save files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Unique filename
  },
});
const upload = multer({ storage });

// Middleware for JWT authentication
function authenticateToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  jwt.verify(token, 'your_jwt_secret', (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
}

// Register route
router.post('/register', async (req, res) => {
  const { email, password, firstName, lastName, dateOfBirth } = req.body;

  if (!email || !password || !firstName || !lastName || !dateOfBirth) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const existingUser  = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existingUser .rows.length > 0) {
      return res.status(409).json({ error: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (email, password, first_name, last_name, date_of_birth) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [email, hashedPassword, firstName, lastName, dateOfBirth]
    );

    res.status(201).json({
      message: 'Registration successful',
      user: { email: result.rows[0].email, id: result.rows[0].id },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error during registration' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const userResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userResult.rows.length === 0) {
      return res.status( 401).json({ error: 'Invalid email or password' });
    }

    const user = userResult.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user.id }, 'your_jwt_secret', { expiresIn: '1h' });

    res.status(200).json({
      message: 'Login successful',
      token,
      user: { email: user.email, id: user.id },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error during login' });
  }
});

// Get profile
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const user = await pool.query(
      'SELECT id, email, first_name, last_name, date_of_birth, bio, profile_picture FROM users WHERE id = $1',
      [req.user.userId]
    );
    if (user.rows.length === 0) return res.status(404).json({ error: 'User  not found' });

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

router.put('/profile', authenticateToken, async (req, res) => {
    const { firstName, lastName, bio } = req.body;
  
    try {
      const result = await pool.query(
        'UPDATE users SET first_name = $1, last_name = $2, bio = COALESCE($3, bio) WHERE id = $4 RETURNING *',
        [firstName, lastName, bio, req.user.userId]
      );
  
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'User  not found' });
      }
  
      res.status(200).json({ message: 'Profile updated successfully', profile: result.rows[0] });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to update profile' });
    }
  });
// Delete bio
router.delete('/profile/bio', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      'UPDATE users SET bio = NULL WHERE id = $1 RETURNING *',
      [req.user.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User  not found' });
    }

    res.status(200).json({ message: 'Bio deleted successfully', profile: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete bio' });
  }
});

// Delete profile
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