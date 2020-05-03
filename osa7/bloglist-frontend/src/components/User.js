import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Typography, Table, TableBody, TableContainer, Paper, TableRow, TableCell, Grid } from '@material-ui/core'
import Confirm from './Confirm'
import { deleteUser } from '../reducers/userReducer'

const User = () => {
  const history = useHistory()
  const id = useParams().id
  const users = useSelector(state => state.users)
  const loggedUser = useSelector(state => state.login)
  const dispatch = useDispatch()

  const user = users.find(u => u.id === id)
  if(!user){
    return null
  }

  const canRemove = () => {
    if(loggedUser && loggedUser.username === user.username){
      return true
    }
    return false
  }

  const RemoveAccount = () => {
    dispatch(deleteUser(user))
    history.push('/blogs')
  }

  return(
    <Grid alignItems="stretch" justify="center" container direction="column" spacing={3}>
      <Grid alignItems="center" container justify="center" direction="column">
        <Grid item>
          <Typography variant="h2">{user.name}</Typography>
        </Grid>
        <Grid item>
          {user.blogs.length < 1 ? <Typography variant="h4" >no blogs yet :/</Typography> : <Typography variant="h4" >added blogs</Typography>}
        </Grid>
      </Grid>
      {canRemove() &&
      <Confirm
        buttonText="Delete account"
        dialogTitle="Delete accout"
        dialogText={`You are about to delete your account ${loggedUser.name}. All your blogs and information will be removed. This action cannot be reverted.`}
        confirmButtonName="Remove Account"
        cancelButtonName="Cancel"
        action={RemoveAccount}
      />
      }
      <Grid item>
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              {user.blogs.map(b =>
                <TableRow key={b.id}>
                  <TableCell>
                    <Link  to={`/blogs/${b.id}`}>{b.title} </Link>
                  </TableCell>
                  <TableCell>
                    <Typography>{b.likes} likes</Typography>
                  </TableCell>
                </TableRow>)}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  )
}

export default User