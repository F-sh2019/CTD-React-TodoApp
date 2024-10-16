import React, { useState } from 'react';

export default function SearchTask({ todoList, onSearchResults }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchInput = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    const filteredTasks = todoList.filter(todo => 
      todo.title.toLowerCase().includes(value)
    );
    onSearchResults(filteredTasks); // Pass the filtered tasks to the parent
  };

  return (
    <div>
      <input 
        type="text"
        placeholder="Search task..."
        value={searchTerm}
        onChange={handleSearchInput}
      />
    </div>
  );
}