import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeActiveFilter, clearCompleted } from "../todos/todosSlice";


const ContentFooter = () => {
  const items = useSelector((state) => state.todos.items);

  const itemsLeft = items.filter((item) => !item.completed).length;

  const activeFilter = useSelector((state) => state.todos.activeFilter);

  const dispatch = useDispatch();


  console.log(itemsLeft);

  console.log(items);

  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{itemsLeft} </strong> {items.length <=1 ? "item left" : "items left"}

      </span>

      <ul className="filters">
        <li>
          <a onClick={() => dispatch(changeActiveFilter( "all" ))} href="#/" className={activeFilter === 'all' ? 'selected' : ''}>
            All
          </a>
        </li>
        <li>
          <a onClick={()=> dispatch(changeActiveFilter( "active" ))} className={activeFilter === 'active' ? 'selected' : ''} href="#/">Active</a>
        </li>
        <li>
          <a onClick={()=> dispatch(changeActiveFilter( "completed" ))} className={activeFilter === 'completed' ? 'selected' : ''} href="#/">Completed</a>
        </li>
      </ul>

      <button onClick={() => dispatch(clearCompleted())} className="clear-completed">Clear completed</button>
    </footer>
  );
};

export default ContentFooter;
