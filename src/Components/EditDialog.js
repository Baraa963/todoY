import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TodosContext } from "../Contexts/TodosContext";
import Button from "@mui/material/Button";
import { useContext, useState } from "react";
import TextField from "@mui/material/TextField";

export default function EditDialog({ todo, openEdit, setOpenEdit }) {
  const { todos, setTodos } = useContext(TodosContext);
  const [updateTodo, setUpdateTodo] = useState({ title: "", details: "" });

  const handleClickOpen = () => {
    setOpenEdit(false);
  };

  function EditedClick() {
    const updatedTodos = todos.map((t) => {
      if (t.id === todo.id) {
        return { ...t, title: updateTodo.title };
      }
      return t;
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));

    setOpenEdit(false);
  }
  return (
    <Dialog
      sx={{ direction: "rtl" }}
      open={openEdit}
      onClose={handleClickOpen}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{" قائمة الحذف "}</DialogTitle>
      <DialogContent>
        <TextField
          sx={{width:"100%"}}
          placeholder={todo.title}
          required
          margin="dense"
          label=" عنوان المهمة الجديد "
          type="email"
          autoFocus
          variant="standard"
          value={updateTodo.title}
          onChange={(e) =>
            setUpdateTodo({ ...updateTodo, title: e.target.value })
          }
        />
      </DialogContent>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          هل أنت متاكد من أنك تريد تعديل هذه المهمة؟
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClickOpen}> إلغاء الأمر </Button>
        <Button
          onClick={() => {
            EditedClick();
          }}
          autoFocus
        >
          تعديل المهمة
        </Button>
      </DialogActions>
    </Dialog>
  );
}
