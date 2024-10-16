import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AddTodoForm from './components/AddTodoForm';
import TodoList from './components/TodoList'; 


export default function TodoContainer({ tableName }) {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

 
  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`https://api.airtable.com/v0/YOUR_APP_ID/${tableName}`, {
          headers: {
            Authorization: `Bearer `
          }
        });
        const data = await response.json();
        const sortedData = data.records.sort((a, b) => a.fields.title.localeCompare(b.fields.title)); 
        setTodoList(sortedData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchTodos();
  }, [tableName]);

  // Add Todo
  const addTodo = async (title) => {
    try {
      const response = await fetch(`https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${tableName}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer `,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fields: {
            title
          }
        })
      });
      const newTodo = await response.json();
      const updatedList = [...todoList, newTodo].sort((a, b) => a.fields.title.localeCompare(b.fields.title));
      setTodoList(updatedList);
    } catch (error) {
      console.error('Error adding todo: ', error);
    }
  };

  // Remove Todo
  const removeTodo = async (id) => {
    try {
      await fetch(`https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${tableName}/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`
        }
      });
      const updatedList = todoList.filter((todo) => todo.id !== id);
      setTodoList(updatedList);
    } catch (error) {
      console.error('Error removing todo: ', error);
    }
  };

  return (
    <div>
      <h1>{tableName}</h1>
      <AddTodoForm onAddTodo={addTodo} />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
      )}
    </div>
  );
}

TodoContainer.propTypes = {
  tableName: PropTypes.string.isRequired
};