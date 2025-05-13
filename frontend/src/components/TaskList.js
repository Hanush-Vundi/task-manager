import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import AddTask from './AddTask';
import EditTaskForm from './EditTaskForm';

function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [editingTask, setEditingTask] = useState(null);

    const loadTasks = async (query = '') => {
        try {
        const res = await axios.get(`/tasks${query ? `/search?query=${query}` : ''}`);
        setTasks(res.data);
        } catch (error) {
        console.error('Failed to fetch tasks:', error.message);
        }
    };

    useEffect(() => {
        loadTasks();
    }, []);

    const deleteTask = async (id) => {
        const confirm = window.confirm('Are you sure you want to delete this task?');
        if (!confirm) return;
        try {
        await axios.delete(`/tasks/${id}`);
        alert('Task deleted successfully!');
        loadTasks(searchQuery); // Reload with search query if applied
        } catch (error) {
        console.error('Error deleting task:', error.message);
        }
    };

    const startEdit = (task) => {
        setEditingTask(task);
    };

    const cancelEdit = () => {
        setEditingTask(null);
    };

    const handleUpdate = async (updatedTask) => {
        try {
        await axios.put(`/tasks/${updatedTask._id}`, updatedTask);
        alert('Task updated successfully!');
        setEditingTask(null);
        loadTasks(searchQuery); // Reload with search query if applied
        } catch (error) {
        console.error('Failed to update task:', error.message);
        }
    };

    const handleSearch = async () => {
        loadTasks(searchQuery); // Trigger search with query
    };

    const handleReset = () => {
        setSearchQuery('');
        loadTasks(); // Reload tasks without search
    };

    return (
        <div>
        <AddTask onTaskAdded={loadTasks} />
        <hr />
        <h2>All Tasks</h2>
        <input
            type="text"
            placeholder="Search by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ marginBottom: '10px', marginTop: '10px' }}
        />
        <button onClick={handleSearch}>Search</button>
        <button onClick={handleReset} style={{ marginLeft: '10px' }}>
            Reset
        </button>
        {tasks.length === 0 ? (
            <p>No tasks found</p>
        ) : (
            <ul>
            {tasks.map((task) => (
                <li key={task._id}>
                <strong>{task.taskTitle}</strong> - {task.taskStatus}
                <button onClick={() => deleteTask(task._id)} style={{ marginLeft: '10px' }}>
                    Delete
                </button>
                <button onClick={() => startEdit(task)} style={{ marginLeft: '5px' }}>
                    Edit
                </button>
                </li>
            ))}
            </ul>
        )}

        {editingTask && (
            <EditTaskForm
            task={editingTask}
            onCancel={cancelEdit}
            onUpdate={handleUpdate}
            />
        )}
        </div>
    );
}

export default TaskList;
