import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CheckIcon from "@mui/icons-material/Check";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useContext, useState } from "react";
import { TodosContext } from "../Contexts/TodosContext";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export default function Todo({ todo }) {
  /**=========== todos Context Data =========== */

  const { todos, setTodos } = useContext(TodosContext);

  /**=========== Edit the title and subtitle of the todo. =========== */

  const [showEditPopup, setShowEditPopup] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editDetails, setEditDetails] = useState("");

  function CompletedClick() {
    const updatedTodos = todos.map((t) => {
      if (t.id === todo.id) {
        return { ...t, isCompleted: !t.isCompleted }; // Toggle the completion status
      }
      return t;
    });

    setTodos(updatedTodos); // Update the state with the new list
  }

  function DeletedClick() {
    const TodoListAfterDeletion = todos.filter((t) => {
      return t.id !== todo.id;
    });
    setTodos(TodoListAfterDeletion);
  }

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
    <Card
      className="todo-card"
      sx={{
        minWidth: 275,
        background: "#283593",
        color: "white",
        marginTop: "1rem",
      }}
    >
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Typography variant="h5">{todo.title}</Typography>
            <Typography variant="h6">{todo.details}</Typography>
          </Grid>
          <Grid
            item
            xs={4}
            display="flex"
            justifyContent="space-around"
            alignItems="center"
          >
            <IconButton
              className="iconButton"
              sx={{
                color: todo.isCompleted ? "white" : "#8bc34a",
                background: todo.isCompleted ? "#8bc34a" : "white",
                border: "solid #8bc34a 3px",
              }}
              onClick={CompletedClick}
            >
              <CheckIcon />
            </IconButton>
            <IconButton
              className="iconButton"
              sx={{
                color: "#1769aa",
                background: "white",
                border: "solid #1769aa 3px",
              }}
              onClick={() => setShowEditPopup((prev) => !prev)}
            >
              <ModeEditIcon />
            </IconButton>
            <IconButton
              className="iconButton"
              sx={{
                color: "#b23c17",
                background: "white",
                border: "solid #b23c17 3px",
              }}
              onClick={DeletedClick}
            >
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
        {showEditPopup && (
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
        )}
      </CardContent>
    </Card>
  );
}
