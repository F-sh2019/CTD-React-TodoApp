import { useState } from 'react';
import InputWithLabel from './InputWithLabel';
import PropTypes from 'prop-types';

export default function AddTodoForm({onAddTodo}){

    const [todoTitle , settodoTitle]= useState("");
    const  handleTitleChange =(event)=>{
        const newTodoTitle=event.target.value;
        settodoTitle (newTodoTitle);
    };

    const handleAddTodo = (event)=>{
        event.preventDefault();
        const form= event.target ;
        const newTodo={
            title:todoTitle , id: Date.now() ,
        } ;
    onAddTodo(newTodo);
    settodoTitle("");
    };

    return (
        <form onSubmit={handleAddTodo}>
        <InputWithLabel todoTitle={todoTitle}  handleTitleChange={handleTitleChange}>Add Todo!</InputWithLabel>
        <button type="submit">+</button>
        </form>
    );

};
AddTodoForm.propTypes = {
    onAddTodo: PropTypes.func.isRequired, 
};