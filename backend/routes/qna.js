const express = require('express');
const router = express.Router();
const pool = require('../db');

// Endpoint to get all questions
router.get('/questions', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM questions');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching questions:', error);
        res.status(500).json({ error: 'Failed to fetch questions' });
    }
});

// Endpoint to add a new question
router.post('/questions', async (req, res) => {
    const { text } = req.body;

    if (text && text.trim() !== '') {
        try {
            const result = await pool.query(
                'INSERT INTO questions (text) VALUES ($1) RETURNING *',
                [text]
            );
            res.status(201).json(result.rows[0]);
        } catch (error) {
            console.error('Error adding question:', error);
            res.status(500).json({ error: 'Failed to add question' });
        }
    } else {
        res.status(400).json({ error: 'Question text is required' });
    }
});

// Update question
router.put('/questions/:id', async (req, res) => {
    const { id } = req.params;
    const { text } = req.body;

    if (!text || text.trim() === '') {
        return res.status(400).json({ error: 'Question text is required' });
    }

    try {
        const result = await pool.query(
            'UPDATE questions SET text = $1 WHERE id = $2 RETURNING *',
            [text, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Question not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Error updating question:', error);
        res.status(500).json({ error: 'Failed to update question' });
    }
});

// Delete question
router.delete('/questions/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query('DELETE FROM questions WHERE id = $1 RETURNING *', [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Question not found' });
        }
        res.status(200).json({ message: 'Question deleted' });
    } catch (error) {
        console.error('Error deleting question:', error);
        res.status(500).json({ error: 'Failed to delete question' });
    }
});

module.exports = router;
