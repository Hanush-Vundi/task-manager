// frontend/src/pages/Home.js
import React, { useEffect, useState } from 'react';
import { getTasks, createTask, deleteTask, searchTasks } from '../services/taskService';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

const Home = () => {
    const [tasks, setTasks] = useState([]);

    const loadTasks = async () => {
        const res = await getTasks();
        setTasks(res.data);
    };

    useEffect(() => {
        loadTasks();
    }, []);

    const handleCreate = async (taskData) => {
        await createTask(taskData);
        loadTasks();
    };

    const handleDelete = async (id) => {
        await deleteTask(id);
        loadTasks();
    };

    const handleSearch = async (keyword) => {
        const res = await searchTasks(keyword);
        setTasks(res.data);
    };

    return (
        <div>
        <h1>Task Manager</h1>
        <TaskForm onSubmit={handleCreate} />
        <input type="text" placeholder="Search tasks..." onChange={(e) => handleSearch(e.target.value)} />
        <TaskList tasks={tasks} onDelete={handleDelete} onEdit={(task) => console.log('Edit task', task)} />
        </div>
    );
};

export default Home;
