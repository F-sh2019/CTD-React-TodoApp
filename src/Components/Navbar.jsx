import React from 'react';
import {  Link } from "react-router-dom";
import styles from './Navbar.module.css'

export default function navbar({ setShowAddForm }) {
  return (
  <div  className={styles.nav}>
    <ul>
    <li>
      <Link to="/">Home</Link>
    </li>
    <li>
          <Link to="/ShowList" >Search List</Link>
    </li>
    <li>
       <Link to="/AddTodo"  >Add Todo</Link>
        
    </li>
   
    </ul>
  </div>
  );
}
