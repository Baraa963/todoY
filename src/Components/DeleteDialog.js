import {
  Button,
  Typography,
  useToast,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useDispatch,
} from "../Imports/Imports";

export default function DeleteDialog({ todo, openDelete, setOpenDelete }) {
  const handleClose = () => setOpenDelete(false);
  const { showToast } = useToast();
  const dispatch = useDispatch(); // useDispatch ile dispatch fonksiyonunu alın
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
