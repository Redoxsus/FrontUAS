const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const subscriptionRoutes = require('./routes/subscription');

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Welcome to the Lifestyle App API!');
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api', subscriptionRoutes);

// Jalankan server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
