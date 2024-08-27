import "./App.css";

import TodoList from "./Components/TodoList";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: ["A"],
  },
});
function App() {
  return (
    <ThemeProvider theme={theme}>

    <div className="App">
      <TodoList />
    </div>
    </ThemeProvider>
  );
}

export default App;
