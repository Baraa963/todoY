import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CheckIcon from "@mui/icons-material/Check";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useState } from "react";
import DeleteDialog from "./DeleteDialog";
import EditDialog from "./EditDialog";
import { useToast } from "../Contexts/ToastContext";

export default function Todo({ todo, dispatch }) {
  const { showToast } = useToast();
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  function CompletedClick() {
    dispatch({
      type: "TodoCompleteToggle",
      payload: { id: todo.id },
    });
    const message = todo.isCompleted ? "لم يتم إنجاز هذه المهمة" : "تم إنجاز هذه المهمة";
    showToast(message, todo.isCompleted ? "warning" : "success");
  }

  function DeletedClick() {
    setOpenDelete(true);
  }

  function EditedClick() {
    setOpenEdit(true);
  }

  return (
    <>
      {openDelete && (
        <DeleteDialog
          todo={todo}
          openDelete={openDelete}
          setOpenDelete={setOpenDelete}
          dispatch={dispatch}
        />
      )}
      {openEdit && (
        <EditDialog
          todo={todo}
          openEdit={openEdit}
          setOpenEdit={setOpenEdit}
          dispatch={dispatch}
        />
      )}
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
              <Typography
                variant="h5"
                style={{
                  textDecoration: todo.isCompleted ? "line-through" : "none",
                }}
              >
                {todo.title}
              </Typography>
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
                onClick={EditedClick}
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
        </CardContent>
      </Card>
    </>
  );
}
