import React from 'react';

const TodoItem = ({ todo, updateTodo, deleteTodo }) => {
    const handleToggle = () => {
        updateTodo(todo.id, { ...todo, completed: !todo.completed });
    };

    return (
        <li>
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={handleToggle}
            />
            <span>{todo.title}</span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
        </li>
    );
};

export default TodoItem;
