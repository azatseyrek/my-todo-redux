import { nanoid } from "@reduxjs/toolkit";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo, addTodoAsync } from "../todos/todosSlice";


const Form = () => {
  const [title, setTitle] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
      if (!title) {
        return
      };

    e.preventDefault();

    await dispatch(addTodoAsync({ title }));

    setTitle("");
  };



  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
        />
      </form>
    </div>
  );
};

export default Form;
