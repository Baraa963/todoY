const TodoReducer = (state, action) => {
  switch (action.type) {
    case "InitializeTodos":
      return action.payload;
    case "TodoAdd":
      const newTodo = {
        id: Date.now(),
        title: action.payload.newTodo,
        details: "",
        isCompleted: false,
        createdDate: new Date().toISOString(),
      };
      localStorage.setItem("todos", JSON.stringify([...state, newTodo]));
      return [...state, newTodo];
    case "TodoCompleteToggle":
      const updatedTodos = state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, isCompleted: !todo.isCompleted }
          : todo
      );
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    case "TodoDelete":
      const filteredTodos = state.filter((todo) => todo.id !== action.payload.id);
      localStorage.setItem("todos", JSON.stringify(filteredTodos));
      return filteredTodos;
    case "TodoEdit":
      const editedTodos = state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, title: action.payload.title, details: action.payload.details }
          : todo
      );
      localStorage.setItem("todos", JSON.stringify(editedTodos));
      return editedTodos;
    default:
      return state;
  }
};

export default TodoReducer;
