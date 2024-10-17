import styles from "./TodoListItem.module.css"
import PropTypes from 'prop-types';
import deleteIcon from './ico-delete.png';


export default function TodoListItem({todo , onRemoveTodo , id ,showRemove}){


    return(
         <section className={styles.data}>
        <li className = {styles.ListItem}> {todo}
                {showRemove && (
                    <img
                        src={deleteIcon}
                        alt="Remove Todo"
                        className={styles.removeIcon}
                        onClick={() => onRemoveTodo(id)}
                    />
                )}
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