import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { useSelector } from "react-redux";
import { toggle, destroy, getTodosAsync } from "../todos/todosSlice";

let filtered = [];

const TodoList = () => {
  const dispatch = useDispatch();

  //backendten gelen verileri almak icin slice kisminda getTodosAsync olusturduk. 
  //useEffect ile sayfami yenilendiginde apiden gelen verileri almis oluyoruz.

  useEffect(() => {
    dispatch(getTodosAsync());
  }, []);

  const items = useSelector((state) => state.todos.items);
  const activeFilter = useSelector((state) => state.todos.activeFilter);
  const error = useSelector((state) => state.todos.error)
  const isLoading = useSelector((state) => state.todos.isLoading);

  function handleDestroy(id) {
    if (window.confirm("Are you sure?")) {
      dispatch(destroy(id));
    }
  }


  filtered = items;

  if (activeFilter !== "all") {
    filtered = items.filter(
      (todo) =>
        activeFilter === "active"
          ? todo.completed === false
          : todo.completed === true //compmleted
    );
  }

  if (isLoading) {
    return <div style={{padding: 15, fontSize:18}}>Loading...</div>
  }

  if (error) {
    return <div style={{color:"red", padding: 15, fontSize:18}}>Error: {error}</div>
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
