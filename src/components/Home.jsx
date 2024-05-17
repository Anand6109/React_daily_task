import React, { useEffect, useState } from 'react';
import Task from './Task';

const Home = () => {

    // Add error handling for JSON parsing
    const getInitialTasks = () => {
        try {
            const tasks = localStorage.getItem("tasks");
            return tasks ? JSON.parse(tasks) : [];
        } catch (error) {
            console.error("Error parsing JSON from localStorage", error);
            return [];
        }
    };

    const [tasks, setTasks] = useState(getInitialTasks());
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const submitHandler = (e) => {
        e.preventDefault();
        setTasks([...tasks, { title, description }]);
        setTitle(""); // Clear the input fields after submission
        setDescription(""); // Clear the input fields after submission
    };

    const deleteTask = (index) => {
        const filteredArr = tasks.filter((val, i) => i !== index);
        setTasks(filteredArr);
    };

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    return (
        <div className="container">
            <h1>Daily tasks</h1>
            <form onSubmit={submitHandler}>
                <input
                    type="text"
                    placeholder='Title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea
                    placeholder='Description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                ></textarea>
                <button type="submit">Add</button>
            </form>

            {tasks.map((item, index) => (
                <Task
                    key={index}
                    title={item.title}
                    description={item.description}
                    deleteTask={deleteTask}
                    index={index}
                />
            ))}
        </div>
    );
};

export default Home;
