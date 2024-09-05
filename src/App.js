import "./App.css";
import { useReducer, useState } from "react";
import TodoList from "./Components/TodoList";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SnackBar from "./Components/SnackBar";
import { ToastProvider } from "./Contexts/ToastContext";
import Loading from "./Components/Loading";
import TodoReducer from "./Redures/TodosReducer";

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
  const [todos, dispatch] = useReducer(TodoReducer, []);
  const [loading, setLoading] = useState(true);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <ToastProvider>
          {loading ? (
            <Loading setLoading={setLoading} />
          ) : (
            <>
              <SnackBar />
              <TodoList todos={todos} dispatch={dispatch} />
            </>
          )}
        </ToastProvider>
      </div>
    </ThemeProvider>
  );
}

export default App;
