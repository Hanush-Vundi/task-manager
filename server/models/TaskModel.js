const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    taskTitle: {
        type: String,
        required: true
    },
    taskDescription: {
        type: String,
        required: true
    },
    taskDueDate: {
        type: Date,
        required: true
    },
    taskStatus: {
        type: String,
        enum: ['Pending', 'In Progress', 'Completed'],
        default: 'Pending'
    },
    taskRemarks: {
        type: String,
        default: ''
    },
    createdOn: {
        type: Date,
        default: Date.now
    },
    lastUpdatedOn: {
        type: Date,
        default: Date.now
    },
    createdBy: {
        id: String,
        name: String
    },
    lastUpdatedBy: {
        id: String,
        name: String
    }
});

module.exports = mongoose.model('Task', TaskSchema);
