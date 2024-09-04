import { v4 as uuidv4 } from "uuid";

export default function TodoReducer(CurrentTodos, action) {
  switch (action.type) {
    case "InitializeTodos": {
      return action.payload;
    }
    case "TodoAdd": {
      const newTodo = {
        id: uuidv4(),
        title: action.payload.newTodo,
        details: "",
        isCompleted: false,
        createdDate: new Date(),
      };
      const updatedTodos = [...CurrentTodos, newTodo];
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }
    case "DeleteTodo": {
      const updatedTodos = CurrentTodos.filter((t) => t.id !== action.payload.id);
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }
    case "TodoEdit": {
      const updatedTodos = CurrentTodos.map((t) => {
        if (t.id === action.payload.id) {
          return { ...t, ...action.payload.updatedTodo };
        }
        return t;
      });
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }
    case "TodoCompleteToggle": {
      const updatedTodos = CurrentTodos.map((t) => {
        if (t.id === action.payload.id) {
          return { ...t, isCompleted: !t.isCompleted };
        }
        return t;
      });
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }
    default: {
      throw new Error("Unknown action: " + action.type);
    }
  }
}
