import { AlertTitle, Alert as MuiAlert, AlertColor, Snackbar } from "@mui/material";

interface IProps {
  open: boolean;
  onClose?: () => void;

  type: AlertColor | null;
  title?: string;
  message?: string;
  autoHideDuration?: number;
}

export const Alert = ({type, title, message, open, onClose, autoHideDuration = 2000,}: IProps) => {

  return (
    <Snackbar
      open={open}
      onClose={onClose}
      autoHideDuration={autoHideDuration}
      anchorOrigin={{horizontal: 'center', vertical: 'top'}}
    >
      <MuiAlert variant={'filled'} severity={type ?? undefined}>
        <AlertTitle>{title}</AlertTitle>
        {message}
      </MuiAlert>
    </Snackbar>

  );
};