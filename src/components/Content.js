import React from "react";
import ContentFooter from "./ContentFooter";
import Footer from "./Footer";
import TodoList from "./TodoList";

const Content = () => {
  return (
    <div>
      <section className="main">
        <input className="toggle-all" type="checkbox" />
        <label htmlFor="toggle-all">Mark all as complete</label>

        <TodoList />
      </section>

      <ContentFooter />
    </div>
  );
};

export default Content;
