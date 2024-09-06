import "./App.css" ;
import {useState,createTheme,ThemeProvider,TodosProvider,ToastProvider,Loading,SnackBar,TodoList,
} from "./Imports/Imports"; 

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
  const [loading, setLoading] = useState(true);

  return (
    <ThemeProvider theme={theme}>
      <TodosProvider>
        <ToastProvider>
          <div className="App">
            {loading ? (
              <Loading setLoading={setLoading} />
            ) : (
              <>
                <SnackBar />
                <TodoList />
              </>
            )}
          </div>
        </ToastProvider>
      </TodosProvider>
    </ThemeProvider>
  );
}

export default App;
