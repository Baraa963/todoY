const TodoReducer = (todos, action) => {
  switch (action.type) {
    case "InitializeTodos":
      return action.payload;
    case "TodoAdd":
      const newTodo = {
        id: Date.now(),
        title: action.payload.newTodo.details,
        details:action.payload.newTodo.title,
        isCompleted: false,
        createdDate: new Date().toISOString(),
      };
      localStorage.setItem("todos", JSON.stringify([...todos, newTodo]));
      return [...todos, newTodo];
    case "CompletedTodos":
      const updatedTodos = todos.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, isCompleted: !todo.isCompleted }
          : todo
      );
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    case "TodoDelete":
      const filteredTodos = todos.filter((todo) => todo.id !== action.payload.id);
      localStorage.setItem("todos", JSON.stringify(filteredTodos));
      return filteredTodos;
    case "TodoEdit":
      const editedTodos = todos.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, title: action.payload.title, details: action.payload.details }
          : todo
      );
      localStorage.setItem("todos", JSON.stringify(editedTodos));
      return editedTodos;
    default:
      return todos;
  }
};

export default TodoReducer;
