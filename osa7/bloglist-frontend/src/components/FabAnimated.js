import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Zoom from '@material-ui/core/Zoom'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'

const useStyles = makeStyles((theme) => ({
  fab: {
    [theme.breakpoints.down('sm')]: {
      position: 'absolute',
      bottom: theme.spacing(3),
      right: theme.spacing(3),
    },
    [theme.breakpoints.up('md')]: {
      position: 'absolute',
      bottom: theme.spacing(10),
      left: '48%'
    },
  },
}))

const FloatingActionButtonZoom = ({ on, handleClick }) => {
  const classes = useStyles()
  const theme = useTheme()

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  }

  const fab = {
    color: 'primary',
    className: classes.fab,
    icon: <AddIcon />,
    label: 'Add',
  }

  return (

    <Zoom
      key={fab.color}
      in={on ? true : false}
      timeout={transitionDuration}
      style={{
        transitionDelay: `${transitionDuration.exit}ms`,
      }}
      unmountOnExit
    >
      <Fab aria-label={fab.label} className={fab.className} color={fab.color}
        onClick={() => handleClick()}>
        {fab.icon}
      </Fab>
    </Zoom>
  )

}

export default FloatingActionButtonZoom
