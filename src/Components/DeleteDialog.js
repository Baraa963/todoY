import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useToast } from "../Contexts/ToastContext";

export default function DeleteDialog({ todo, openDelete, setOpenDelete, dispatch }) {
  const handleClose = () => setOpenDelete(false);
  const { showToast } = useToast();

  const handleDelete = () => {
    dispatch({
      type: "TodoDelete",
      payload: { id: todo.id },
    });
    handleClose();
    showToast(" تم حذف المهمة بنجاح ", "error");

  };

  return (
    <Dialog open={openDelete} onClose={handleClose}>
      <DialogTitle>حذف المهمة</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          هل أنت متأكد أنك تريد حذف هذه المهمة؟
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          إلغاء
        </Button>
        <Button onClick={handleDelete} color="secondary">
          حذف
        </Button>
      </DialogActions>
    </Dialog>
  );
}
