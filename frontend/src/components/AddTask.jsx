import React, { useState } from 'react';
import axios from '../api/axios';

function AddTask({ onTaskAdded }) {
    const [task, setTask] = useState({
        taskTitle: '',
        taskDescription: '',
        taskDueDate: '',
        taskStatus: '',
        taskRemarks: '',
        createdBy: { id: '101', name: 'Ganesh' },
        lastUpdatedBy: { id: '101', name: 'Ganesh' },
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask((prev) => ({
        ...prev,
        [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        await axios.post('/tasks', task);
        alert('Task added successfully!');
        setTask({
            taskTitle: '',
            taskDescription: '',
            taskDueDate: '',
            taskStatus: '',
            taskRemarks: '',
            createdBy: { id: '101', name: 'Ganesh' },
            lastUpdatedBy: { id: '101', name: 'Ganesh' },
        });
        onTaskAdded(); // reload task list
        } catch (error) {
        console.error('Error creating task:', error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
        <h3>Add New Task</h3>
        <input
            type="text"
            name="taskTitle"
            placeholder="Title"
            value={task.taskTitle}
            onChange={handleChange}
            required
        />
        <br />
        <textarea
            name="taskDescription"
            placeholder="Description"
            value={task.taskDescription}
            onChange={handleChange}
            required
        />
        <br />
        <input
            type="date"
            name="taskDueDate"
            value={task.taskDueDate}
            onChange={handleChange}
            required
        />
        <br />
        <input
            type="text"
            name="taskStatus"
            placeholder="Status"
            value={task.taskStatus}
            onChange={handleChange}
            required
        />
        <br />
        <input
            type="text"
            name="taskRemarks"
            placeholder="Remarks"
            value={task.taskRemarks}
            onChange={handleChange}
        />
        <br />
        <button type="submit">Add Task</button>
        </form>
    );
}

export default AddTask;
