

import React from 'react';
import styles from './App.module.css'
import TodoList from './components/TodoList'
import AddTodoForm from './components/AddTodoForm';
import { useEffect , useState } from 'react';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import routing from './routing.jsx'
import Home from './Home.jsx';
import Navbar from './components/Navbar.jsx'
import PropTypes from 'prop-types';


function App({tableName}) {
  
  const [todoList ,settodoList]= useState([]);
  const [isLoading ,setIsLoading ]=useState(true) ;
  const [sortAcs , setSortAcs]=useState(true); 
  const [showAddtodo , setShowAddtodo]=useState(false);
  const url=`https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${tableName}`;
  


  async function RemoveTodoItem(todoId) {
    
    const options = {
      method: "DELETE",
      headers: {
        Authorization:`Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
    };
    const delUrl = `${url}/${todoId}`;
   
    try {
      const response = await fetch(delUrl, options);
      if (!response.ok) {
        throw new Error(`${response.status}`);
      }
      

      const data = await response.json();
      if (!data.deleted) {
        throw new Error(data.message);
      }

      console.log(data)
      settodoList((prevousTodoList) => 
        prevousTodoList.filter((todo) => todo.id !== data.id));
    } 
    catch (error) {
      console.log(error.message);
      return null;
    }
  }

   


  
  async function addTodoItem(newTodoTitle) {
    //console.log(newTodoTitle)
    const options = {
      method: "POST",
      headers: {
        Authorization:`Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
        "Content-Type": "application/json",
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
      
      const newtodoList = {
        title: data.fields.title,
        id: data.id,
      };
      settodoList((prevousTodoList) => [newtodoList, ...prevousTodoList]);
    } 
    catch (error) {
      console.log(error.message);
      return null;
    }

  }


  async function fetchData(){
  const options={
    method:"Get" ,
    headers:{Authorization:`Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`},
  } ;
  
  const loadUrl=url+'?view=Grid%20view&?sort[0][field]=Title&?sort[0][direction]="asc"'
   console.log(loadUrl);
  try{
    const response = await fetch(loadUrl, options);
    if (! response.ok){
      throw new Err(`${response.status}`) ;
    }
    const data=await response.json();
    const todos= data.records.map((Td)=> {return {  id:Td.id , title:Td.fields.title }; });
    const todosList=todos.sort((objectA, objectB)=>{
      
      
      return  objectA.title.localeCompare(objectB.title);
     
    }) ;
  
     settodoList(todos);
     setIsLoading (false);
  }
  catch(error){
    console.log(error.message) ;
    return null;
  }
}



  useEffect(() => {
      fetchData()
  }, []);

  function handleSortToggleClick(){
    setSortAcs(!sortAcs); // Toggle between Asc and Desc
    const sortedList = [...todoList].sort((a, b) => 
      sortAcs ? b.title.localeCompare(a.title) : a.title.localeCompare(b.title)
    );
   
    settodoList(sortedList);

  }
  
  return (
      <BrowserRouter>
       <div>
      
      <Navbar/>
      <Routes>
        
        <Route path="/ShowList" element={
         <main className={styles.main}>
             
             <button onClick={handleSortToggleClick}>{sortAcs ? "Sort Asc" : "Sort Desc"}</button>
               {isLoading ? (
                 <p>Loading...</p>
                 ) : (
                   <TodoList todoList={todoList} onRemoveTodo={RemoveTodoItem} /> 
                 )}
              
         </main>
           }>
         
       </Route> 
       <Route path="/AddTodo" element={
         <main className={styles.main}>
                          
               <div className={styles.test}><button onClick={handleSortToggleClick}>{sortAcs ? "Sort Asc" : "Sort Desc"}</button>
               <AddTodoForm onAddTodo={addTodoItem}/></div>
               {isLoading ? (
                 <p>Loading...</p>
                 ) : (
                   <TodoList todoList={todoList} onRemoveTodo={RemoveTodoItem} /> 
                 )}
              
         </main>
           } />

        

       <Route path="/" element={<Home/>} />
     </Routes>       
      </div>
     </BrowserRouter> 
   
  
  );
}
App.propTypes = {
  tableName: PropTypes.string.isRequired
};
export default App

