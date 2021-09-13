import React from "react";
import { useDispatch } from "react-redux";

import { useSelector } from "react-redux";
import { toggle, destroy } from "../todos/todosSlice";

let filtered = [];

const TodoList = () => {
  const dispatch = useDispatch();

  const items = useSelector((state) => state.todos.items);
  const activeFilter = useSelector((state) => state.todos.activeFilter);

  function handleDestroy(id) {
    if (window.confirm("Are you sure?")) {
      dispatch(destroy(id));
    }
  }

  filtered = items;

  if (activeFilter !== "all") {
    filtered = items.filter((todo) =>
      activeFilter === "active"
        ? todo.completed === false
        : todo.completed === true  ,    //compmleted
    );
  }

  return (
    <div>
      <ul className="todo-list">
        {filtered.map((item) => (
          <li key={item.id} className={item.completed ? "completed" : ""}>
            <div className="view">
              <input
                className="toggle"
                type="checkbox"
                onChange={() => dispatch(toggle({ id: item.id }))}
              />
              <label>{item.title}</label>
              <button
                onClick={() => handleDestroy(item.id)} //fonksiyon bir parametre aldigi icin yazim bu sekilde oldu
                className="destroy"
              ></button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
