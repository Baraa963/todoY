import Grid from "@mui/material/Grid";

import TextField from "@mui/material/TextField";
import { TodosContext } from "../Contexts/TodosContext";
import { useContext, useState } from "react";
import Button from "@mui/material/Button";



export default function EditPopup({ todo }) {
    const { todos, setTodos } = useContext(TodosContext);
    const [editTitle, setEditTitle] = useState("");
    const [showEditPopup, setShowEditPopup] = useState(false);

    function EditedClick() {
        const TodoListAfterEditing = todos.map((t) => {
          if (t.id === todo.id) {
            return { ...t, title: editTitle };
          }
          return t;
        });
        setTodos(TodoListAfterEditing);
        setShowEditPopup(false);
      }
  return (
    <Grid container spacing={2} sx={{ width: "100%", marginTop: "1rem" }}>
            <Grid item xs={8}>
              <TextField
                id="outlined-basic"
                label=" عنوان المهمة الجديد "
                variant="outlined"
                sx={{
                  width: "100%",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "white", // Default border color
                    },
                    "&:hover fieldset": {
                      borderColor: "white", // Border color when hovered
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "white", // Border color when focused
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "white", // Label color
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "white", // Label color when focused
                  },
                  "& .MuiOutlinedInput-input": {
                    color: "white", // Input text color
                  },
                }}
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
            </Grid>
            <Grid item xs={4}>
              <Button
                variant="contained"
                sx={{ width: "110%", height: "100%" }}
                onClick={EditedClick}
                style={{ backgroundColor: "#e7c15a" }}
              >
                تعديل المهمة
              </Button>
            </Grid>
          </Grid>
  )
}
