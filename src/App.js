import "./App.css";
import { useState } from "react";
import TodoList from "./Components/TodoList";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { TodosContext } from "./Contexts/TodosContext";
import { SnackbarProvider} from "notistack";


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
    third:{
      main:"#1769aa"
    },
    
  }
});
function App() {
  const [todos, setTodos] = useState([]);
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
      <SnackbarProvider maxSnack={3}>
        <TodosContext.Provider value={{todos,setTodos}}>
          <TodoList />
        </TodosContext.Provider>
      </SnackbarProvider>

      </div>
    </ThemeProvider>
  );
}

export default App;
