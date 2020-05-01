import { useState } from 'react'
import { makeStyles } from '@material-ui/core'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const onSubmit = () => setValue('')

  return {
    type,
    value,
    onChange,
    onSubmit
  }

}

export const useAStyle = () => {
  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    appBar: {
      menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
          display: 'none',
        },
      },
      // necessary for content to be below app bar
      toolbar: theme.mixins.toolbar,
      content: {
        flexGrow: 1,
        padding: theme.spacing(3),
      },
    } }))
  return {
    useStyles
  }
}