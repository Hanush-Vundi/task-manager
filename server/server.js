const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Task = require('./models/TaskModel'); // make sure this path is correct

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/taskdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
    })
    .then(() => console.log('✅ MongoDB connected successfully'))
    .catch((err) => console.error('❌ MongoDB connection error:', err));

    // Routes

    // Create task
    app.post('/api/tasks', async (req, res) => {
    try {
        const task = new Task(req.body);
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
    });

    // Read all tasks
    app.get('/api/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    });

    // Delete task
    app.delete('/api/tasks/:id', async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    });

    // Search task by title
    app.get('/api/tasks/search/q', async (req, res) => {
    try {
        const query = req.query.q;
        const tasks = await Task.find({ taskTitle: { $regex: query, $options: 'i' } });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    });

    // GET /tasks/search?query=meeting
app.get('/tasks/search', async (req, res) => {
    const query = req.query.query || '';
    try {
        const tasks = await Task.find({
        taskTitle: { $regex: query, $options: 'i' } // case-insensitive match
        });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: 'Failed to search tasks' });
    }
});


    // Start server
    app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
