import React from 'react'
import Typography from '@material-ui/core/Typography'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

const Confirm = ({ buttonText, dialogTitle, dialogText, confirmButtonName, cancelButtonName, action }) => {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleConfirmed = () => {
    setOpen(false)
    action()
  }

  return (
    <div>
      <Typography onClick={handleClickOpen}>
        {buttonText}
      </Typography>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Typography variant="contained" onClick={handleConfirmed} color="secondary">
            {confirmButtonName}
          </Typography>
          <Typography variant="contained" onClick={handleClose} color="primary" autoFocus>
            {cancelButtonName}
          </Typography>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Confirm