import styles from "./TodoListItem.module.css"
import PropTypes from 'prop-types';

export default function TodoListItem({todo , onRemoveTodo , id}){


    return(
         <section className={styles.data}>
        <li className = {styles.ListItem}>{todo}
            <button  onClick={()=> onRemoveTodo(id) }>-</button>
        </li>
         </section>
    );

}
TodoListItem.propTypes = {
    todo: PropTypes.string.isRequired, 
    onRemoveTodo: PropTypes.func.isRequired,
    id: PropTypes.oneOfType([           // Allows either a string or a number
        PropTypes.string,
        PropTypes.number,
    ]).isRequired,
};