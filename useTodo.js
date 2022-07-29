import { useEffect, useReducer, useState } from "react";
import { todoReducer } from "../08-useReducer/todoReducer";

export const useTodo = () => {
  const [todosCount, setTodosCount] = useState(0);
  const [pendingTodosCount, setPendingTodosCount] = useState(0);

  const initialState = [];

  const init = () => {
    return JSON.parse(localStorage.getItem("todos")) || [];
  };

  const [todos, dispatch] = useReducer(todoReducer, initialState, init);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    setTodosCount(todos.length);
    setPendingTodosCount(todos.filter((todo) => !todo.done).length);
  }, [todos]);

  const handleNewTodo = (todo) => {
    const action = {
      type: "[TODO] Add Todo",
      payload: todo,
    };
    dispatch(action);
  };
  const handleDeleteTodo = (id) => {
    const action = {
      type: "[TODO] Remove Todo",
      payload: id,
    };
    dispatch(action);
  };

  const onToggleTodo = (id) => {
    const action = {
      type: "[TODO] Toggle Todo",
      payload: id,
    };
    dispatch(action);
  };

  return {
    todos,
    handleNewTodo,
    onToggleTodo,
    handleDeleteTodo,
    pendingTodosCount,
    todosCount,
  };
};
