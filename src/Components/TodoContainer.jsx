import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';
import styles from './TodoContainer.module.css';
import SearchTask from './SearchTask';

function TodoContainer({ tableName ,showAdd}) {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortAcs, setSortAcs] = useState(true);
  const [filteredTodos, setFilteredTodos] = useState([]);

  const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${tableName}`;

  async function fetchData() {
    const options = {
      method: 'GET',
      headers: { Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}` },
    };
    const loadUrl = `${url}?view=Grid%20view`;
    
    try {
      const response = await fetch(loadUrl, options);
      if (!response.ok) {
        throw new Error(`${response.status}`);
      }
      const data = await response.json();
      const todos = data.records.map((td) => ({
        id: td.id,
        title: td.fields.title,
      }));
      setTodoList(todos.sort((a, b) => a.title.localeCompare(b.title)));
      setIsLoading(false);
    } catch (error) {
      console.error(error.message);
    }
  }

  async function addTodoItem(newTodoTitle) {
    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fields: {
          title: newTodoTitle.title,
        },
      }),
    };
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`${response.status}`);
      }
      const data = await response.json();
      const newTodo = {
        title: data.fields.title,
        id: data.id,
      };
      setTodoList((prev) => [newTodo, ...prev]);
    } catch (error) {
      console.error(error.message);
    }
  }

  async function removeTodoItem(todoId) {
    const options = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
      },
    };
    const delUrl = `${url}/${todoId}`;
    try {
      const response = await fetch(delUrl, options);
      if (!response.ok) {
        throw new Error(`${response.status}`);
      }
      const data = await response.json();
      if (data.deleted) {
        setTodoList((prev) => prev.filter((todo) => todo.id !== todoId));
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    fetchData();
  }, [tableName]);

  function handleSortToggleClick() {
    setSortAcs(!sortAcs);
    const sortedList = [...todoList].sort((a, b) =>
      sortAcs ? b.title.localeCompare(a.title) : a.title.localeCompare(b.title)
    );
    setTodoList(sortedList);
  }


  

  useEffect(() => {
    
    setFilteredTodos(todoList); 
  }, [todoList]);

  const handleSearchResults = (filteredTasks) => {
    setFilteredTodos(filteredTasks); 
  };

  return (
    <div className={styles.homeP}>
      <h1>Todo List: {tableName}</h1>
      <button onClick={handleSortToggleClick}>{sortAcs ? 'Sort Asc' : 'Sort Desc'}</button>
      {  showAdd && <><AddTodoForm onAddTodo={addTodoItem} /> {isLoading ? <p>Loading...</p> : <TodoList todoList={todoList} onRemoveTodo={removeTodoItem}  showRemove={showAdd}/>}</>}
      
      { !showAdd && <>      <SearchTask todoList={todoList} onSearchResults={handleSearchResults} />
      <TodoList todoList={filteredTodos}  onRemoveTodo={removeTodoItem}  showRemove={showAdd} /> </>}
      {}


    </div>
  );
}

TodoContainer.propTypes = {
  tableName: PropTypes.string.isRequired,
};

export default TodoContainer;
