import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useToast,
  useState,
  TextField,
  useDispatch,
} from "../Imports/Imports";

export default function EditDialog({ todo, openEdit, setOpenEdit }) {
  const [title, setTitle] = useState(todo.title);
  const [details, setDetails] = useState(todo.details);
  const { showToast } = useToast();

  const handleClose = () => setOpenEdit(false);
  const dispatch  = useDispatch();
  const handleSave = () => {
    dispatch({
      type: "TodoEdit",
      payload: { id: todo.id, title, details },
    });
    handleClose();
    showToast(" تم تعديل المهمة بنجاح ", "warning");
  };

  return (
    <Dialog open={openEdit} onClose={handleClose}>
      <DialogTitle>تعديل المهمة</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="title"
          label="عنوان المهمة"
          type="text"
          fullWidth
          variant="standard"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        />
        <TextField
          margin="dense"
          id="details"
          label="تفاصيل المهمة"
          type="text"
          fullWidth
          variant="standard"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          إلغاء
        </Button>
        <Button onClick={handleSave} color="secondary">
          حفظ
        </Button>
      </DialogActions>
    </Dialog>
  );
}
