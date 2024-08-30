import Grid from "@mui/material/Grid";

import TextField from "@mui/material/TextField";
import { TodosContext } from "../Contexts/TodosContext";
import { useContext, useState } from "react";
import Button from "@mui/material/Button";

export default function EditPopup({ todo,showEditPopup,setShowEditPopup }) {
  const { todos, setTodos } = useContext(TodosContext);
  const [updateTodo, setUpdateTodo] = useState({title:"",details:""});

  function EditedClick() {
    const TodoListAfterEditing = todos.map((t) => {
      if (t.id === todo.id) {
        return { ...t, title: updateTodo.title };
      }
      return t;
    });
    setTodos(TodoListAfterEditing);
    setShowEditPopup(false)
  }
  return (
    <Grid container spacing={2} sx={{ width: "100%", marginTop: "1rem" }}>
      <Grid item xs={9}>
        <TextField
        autoFocus
          id="outlined-basic"
          placeholder={todo.title}
          label=" عنوان المهمة الجديد "
          variant="outlined"
          sx={{
            width: "100%",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "white",
              },
              "&:hover fieldset": {
                borderColor: "white",
              },
              "&.Mui-focused fieldset": {
                borderColor: "white",
              },
            },
            "& .MuiInputLabel-root": {
              color: "white",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "white",
            },
            "& .MuiOutlinedInput-input": {
              color: "white",
            },
          }}
          value={updateTodo.title}
          onChange={(e) => setUpdateTodo({...updateTodo,title:e.target.value})}
        />
      </Grid>
      <Grid item xs={3}>
        <Button
          variant="contained"
          sx={{ width: "115%", height: "100%", fontSize: "0.78rem" }}
          onClick={() => {
            EditedClick();
          }}
          style={{ backgroundColor: "#e7c15a" }}
        >
          تعديل المهمة
        </Button>
      </Grid>
    </Grid>
  );
}
