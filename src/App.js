import "./App.css";
import { useState } from "react";
import TodoList from "./Components/TodoList";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { TodosContext } from "./Contexts/TodosContext";
import SnackBar from "./Components/SnackBar";
import { ToastProvider } from "./Contexts/ToastContext";
import Loading from "./Components/Loading";
const theme = createTheme({
  typography: {
    fontFamily: ["A"],
  },
  palette: {
    primary: {
      main: "#009688",
    },
    secondary: {
      main: "#283593",
    },
    third: {
      main: "#1769aa",
    },
  },
});

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  

 

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <ToastProvider>
          <TodosContext.Provider value={{ todos, setTodos }}>
            {loading ? (
              <Loading loading={loading} setLoading={setLoading}/>
            ) : (
              <>
              <SnackBar/>
              <TodoList />
              </>
            )}
          </TodosContext.Provider>
        </ToastProvider>
      </div>
    </ThemeProvider>
  );
}

export default App;
