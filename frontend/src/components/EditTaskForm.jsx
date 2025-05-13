import React, { useState } from 'react';

function EditTaskForm({ task, onCancel, onUpdate }) {
    const [formData, setFormData] = useState({
        taskTitle: task.taskTitle,
        taskDescription: task.taskDescription,
        taskDueDate: task.taskDueDate.slice(0, 10), // format YYYY-MM-DD
        taskStatus: task.taskStatus,
        taskRemarks: task.taskRemarks,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate({ ...task, ...formData });
    };

    return (
        <form onSubmit={handleSubmit}>
        <h3>Edit Task</h3>
        <input
            type="text"
            name="taskTitle"
            value={formData.taskTitle}
            onChange={handleChange}
            required
            placeholder="Title"
        />
        <br />
        <textarea
            name="taskDescription"
            value={formData.taskDescription}
            onChange={handleChange}
            placeholder="Description"
        />
        <br />
        <input
            type="date"
            name="taskDueDate"
            value={formData.taskDueDate}
            onChange={handleChange}
        />
        <br />
        <select
            name="taskStatus"
            value={formData.taskStatus}
            onChange={handleChange}
        >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
        </select>
        <br />
        <input
            type="text"
            name="taskRemarks"
            value={formData.taskRemarks}
            onChange={handleChange}
            placeholder="Remarks"
        />
        <br />
        <button type="submit">Update</button>
        <button type="button" onClick={onCancel} style={{ marginLeft: '10px' }}>
            Cancel
        </button>
        </form>
    );
}

export default EditTaskForm;
