import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function SnackBar({ open, handleClose, toastMessage, variant }) {
  return (
    <div>
      <Snackbar open={open} autoHideDuration={1500} onClose={handleClose}>
        <Alert
          severity={variant}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {toastMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
