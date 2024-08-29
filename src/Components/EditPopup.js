import Grid from "@mui/material/Grid";

import TextField from "@mui/material/TextField";
import { TodosContext } from "../Contexts/TodosContext";
import { useContext, useState } from "react";
import Button from "@mui/material/Button";

export default function EditPopup({ todo,showEditPopup,setShowEditPopup }) {
  const { todos, setTodos } = useContext(TodosContext);
  const [editTitle, setEditTitle] = useState("");

  function EditedClick() {
    const TodoListAfterEditing = todos.map((t) => {
      if (t.id === todo.id) {
        return { ...t, title: editTitle };
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
          id="outlined-basic"
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
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
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
