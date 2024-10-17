import {React ,useState} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home.jsx';
import Navbar from './components/Navbar.jsx';
import TodoContainer from './components/TodoContainer.jsx';
import PropTypes from 'prop-types';
import styles from "./App.module.css"


function App({ tableName }) {
  
  return (
    <div className={styles.box}>
      
      <BrowserRouter>
     
       <div className={styles.navbar} ><Navbar  />  </div>
        <div className={styles.todocontainer}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ShowList" element={<TodoContainer tableName={tableName} showAdd={false} />} />
          <Route path="/AddTodo" element={<TodoContainer tableName={tableName} showAdd={true} />} />
        </Routes>
        </div>
      </BrowserRouter>
      
    </div>
    
  );
}

App.propTypes = {
  tableName: PropTypes.string.isRequired,
};

export default App;
