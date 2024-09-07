import { useReducer, TodoReducer, useContext } from "../Imports/Imports";
import { createContext } from "react";

const TodosContext = createContext([]);
const DispatchContext = createContext([]);

export default function TodosProvider({ children }) {
  const [todos, dispatch] = useReducer(TodoReducer, []);
  return (
    <TodosContext.Provider value={{ todos }}>
      <DispatchContext.Provider value={{ dispatch }}>
        {children}
      </DispatchContext.Provider>
    </TodosContext.Provider>
  );
}
export const useTodos = () => {
  return useContext(TodosContext);
};
export const useDispatch = () => {
    return useContext(DispatchContext);
  };