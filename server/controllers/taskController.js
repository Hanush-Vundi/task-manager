// backend/controllers/taskController.js
const Task = require('../models/Task');

// CREATE Task
exports.createTask = async (req, res) => {
    try {

        const newTask = new Task(req.body);
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
    };

    // READ All Tasks
    exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
    };

    // UPDATE Task
    exports.updateTask = async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            { ...req.body, lastUpdatedOn: new Date() },
            { new: true }
        );
        res.json(updatedTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
    };

    // DELETE Task
    exports.deleteTask = async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: 'Task deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
    };

    // SEARCH Tasks by title
    exports.searchTasks = async (req, res) => {
    try {
        const keyword = req.query.q || '';
        const tasks = await Task.find({
        taskTitle: { $regex: keyword, $options: 'i' }
    });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
