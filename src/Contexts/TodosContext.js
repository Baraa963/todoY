import {useReducer,TodoReducer,useContext} from "../Imports/Imports";
import { createContext } from "react";


const TodosContext = createContext([]);

export default function TodosProvider ({children}){
const [todos,todosDispatch] = useReducer(TodoReducer,[])
return(
    <TodosContext.Provider value={{todos:todos ,dispatch:todosDispatch}}>
        {children}
    </TodosContext.Provider>
)
}
 export const useTodos =()=>{
    return useContext(TodosContext)
}