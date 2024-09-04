import { createContext, useState ,useContext} from "react";
import SnackBar from "../Components/SnackBar";
const ToastContext = createContext([]);

export const ToastProvider = ({ children }) => {
    const [open, setOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [variant, setVariant] = useState("");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  function showToast(message,variant) {
    setOpen(true);
    setToastMessage(message);
    setVariant(variant);
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      <SnackBar open={open} setOpen={setOpen} handleClose={handleClose} toastMessage={toastMessage} variant={variant}/>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = ()=>{return useContext(ToastContext)}
