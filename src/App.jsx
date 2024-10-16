import {React ,useState} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home.jsx';
import Navbar from './components/Navbar.jsx';
import TodoContainer from './components/TodoContainer.jsx';
import PropTypes from 'prop-types';

function App({ tableName }) {
  
  return (
    <BrowserRouter>
      <div>
        <Navbar  />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ShowList" element={<TodoContainer tableName={tableName} showAdd={false} />} />
          <Route path="/AddTodo" element={<TodoContainer tableName={tableName} showAdd={true} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

App.propTypes = {
  tableName: PropTypes.string.isRequired,
};

export default App;
