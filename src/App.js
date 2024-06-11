import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import './App.css';

const App = () => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
            setTodos(response.data);
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    };

    const addTodo = async (title) => {
        try {
            const response = await axios.post('https://jsonplaceholder.typicode.com/todos', { title, completed: false });
            setTodos([response.data, ...todos]);
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    };

    const updateTodo = async (id, updatedTodo) => {
        try {
            await axios.put(`https://jsonplaceholder.typicode.com/todos/${id}`, updatedTodo);
            setTodos(todos.map(todo => (todo.id === id ? updatedTodo : todo)));
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    };

    const deleteTodo = async (id) => {
        try {
            await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
            setTodos(todos.filter(todo => todo.id !== id));
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    return (
        <div className="App">
            <h1>Todo List</h1>
            <AddTodo addTodo={addTodo} />
            <TodoList todos={todos} updateTodo={updateTodo} deleteTodo={deleteTodo} />
        </div>
    );
};

export default App;
