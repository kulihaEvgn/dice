import { AlertTitle, Alert as MuiAlert, AlertColor, Snackbar } from '@mui/material';

const getAlertTitle = (type: AlertColor | null) => {
  switch (type) {
    case 'success':
      return 'You won!';
    case 'error':
      return 'You lost!';
    default:
      return '';
  }
};

interface IProps {
  open: boolean;
  onClose?: () => void;

  type: AlertColor;
  message?: string;

  autoHideDuration?: number;
}

export const Alert = ({ type, open, onClose, message, autoHideDuration = 2000 }: IProps) => {
  const title = getAlertTitle(type);

  return (
    <Snackbar
      open={open}
      onClose={onClose}
      autoHideDuration={autoHideDuration}
      anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
    >
      <MuiAlert sx={{ width: '500px' }} variant={'filled'} severity={type ?? undefined}>
        <AlertTitle color={'#fff'}>{title}</AlertTitle>
        {message}
      </MuiAlert>
    </Snackbar>
  );
};
