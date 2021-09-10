import React from "react";
import { useDispatch } from "react-redux";

import { useSelector } from "react-redux";
import { toggle } from "../todos/todosSlice";





const TodoList = () => {
const dispatch = useDispatch();

  const items = useSelector((state) => state.todos.items);

  console.log(items);

  return (
    <div>
      <ul className="todo-list">
         {items.map((item) => (
          <li key={item.id} className={item.completed ? "completed" : ""}>
            <div className="view">
              <input className="toggle" type="checkbox" onChange={() => dispatch(toggle({id:item.id}))} />
              <label>{item.title}</label>
              <button className="destroy"></button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
