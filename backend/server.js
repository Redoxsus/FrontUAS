// backend/server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const subscriptionRoutes = require('./routes/subscription');
const qnaRoutes = require('./routes/qna'); // Import qna routes

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

// Use routes
app.use('/api', authRoutes);
app.use('/api', subscriptionRoutes);
app.use('/api', qnaRoutes); // Use qna routes

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
