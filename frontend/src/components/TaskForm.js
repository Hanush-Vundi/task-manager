// frontend/src/components/TaskForm.js
import React, { useState } from 'react';

const TaskForm = ({ onSubmit }) => {
    const [task, setTask] = useState({
        taskTitle: '',
        taskDescription: '',
        taskDueDate: '',
        taskStatus: 'Pending',
        taskRemarks: '',
        createdBy: { name: 'Ganesh', id: '123' },  // Dummy user
        lastUpdatedBy: { name: 'Ganesh', id: '123' }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask({ ...task, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(task);
        setTask({
        taskTitle: '',
        taskDescription: '',
        taskDueDate: '',
        taskStatus: 'Pending',
        taskRemarks: '',
        createdBy: { name: 'Ganesh', id: '123' },
        lastUpdatedBy: { name: 'Ganesh', id: '123' }
        });
    };

    return (
        <form onSubmit={handleSubmit}>
        <input type="text" name="taskTitle" placeholder="Title" value={task.taskTitle} onChange={handleChange} required />
        <textarea name="taskDescription" placeholder="Description" value={task.taskDescription} onChange={handleChange} />
        <input type="date" name="taskDueDate" value={task.taskDueDate} onChange={handleChange} />
        <select name="taskStatus" value={task.taskStatus} onChange={handleChange}>
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
        </select>
        <input type="text" name="taskRemarks" placeholder="Remarks" value={task.taskRemarks} onChange={handleChange} />
        <button type="submit">Create Task</button>
        </form>
    );
};

export default TaskForm;
