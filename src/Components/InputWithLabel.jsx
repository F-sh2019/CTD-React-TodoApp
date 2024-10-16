import {useRef , useEffect} from "react"

export default function InputWithLabel(props){
    const inputRef =useRef() ;
    
    useEffect(()=>{
        inputRef.current.focus
    }) ; 

    return (
        <>
        <label htmlFor="todotitle">{props.children}    </label>
        <input 
                id="todotitle" 
                name="title"
                value={props.todoTitle} 
                onChange= {props.handleTitleChange} 
                ref={inputRef}
            />
        </>
  
    )
}