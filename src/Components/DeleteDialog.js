import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useContext } from "react";
import Button from "@mui/material/Button";
import { TodosContext } from "../Contexts/TodosContext";

export default function DeleteDialog({ todo, openDelete, setOpenDelete }) {
  const { todos, setTodos } = useContext(TodosContext);

  const handleClickOpen = () => {
    setOpenDelete(false);
  };

  const handleClose = () => {
    const updatedTodos = todos.filter((t) => {
      return t.id !== todo.id;
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));

    setOpenDelete(false);
  };
  return (
    <Dialog
      sx={{ direction: "rtl" }}
      open={openDelete}
      onClose={handleClickOpen}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{" قائمة الحذف "}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          هل أنت متاكد من أنك تريد حذف هذه المهمة؟
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClickOpen}> إلغاء الأمر </Button>
        <Button onClick={handleClose} autoFocus>
          بالتأكيد
        </Button>
      </DialogActions>
    </Dialog>
  );
}
