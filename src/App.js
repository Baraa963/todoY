import "./App.css";
import { useState } from "react";
import TodoList from "./Components/TodoList";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { TodosContext } from "./Contexts/TodosContext";


const theme = createTheme({
  typography: {
    fontFamily: ["A"],
  },
  palette:{
    primary:{
      main:"#009688"
    },
    secondary:{
      main:"#283593"
    },
  }
});
function App() {
  const [todos, setTodos] = useState([]);
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <TodosContext.Provider value={{todos,setTodos}}>
          <TodoList />
        </TodosContext.Provider>
      </div>
    </ThemeProvider>
  );
}

export default App;
