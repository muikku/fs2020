import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { TableContainer, Paper, Table, TableCell, TableHead, TableBody, TableRow, Grid, Typography } from '@material-ui/core'
import Loading  from './Loading'


const UserList = () => {
  const users = useSelector(state => state.users)
  return(
    <Grid alignItems="stretch" justify="center" container direction="column" spacing={3}>
      <Grid alignItems="center" container justify="center" direction="column">
        <Grid item>
          <Typography variant="h2">Users</Typography>
        </Grid>
      </Grid>
      <Grid item>
        {users.length >= 1 ?
          <TableContainer component={Paper}>
            <Table >
              <TableHead>
                <TableRow>
                  <TableCell>user</TableCell>
                  <TableCell align="right">blogs created</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell component="th" scope="row">
                      <Link to={`/users/${user.id}`}><Typography>{user.username}</Typography></Link>
                    </TableCell>
                    <TableCell align="right" scope="row"><Typography>{user.blogs.length}</Typography></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          :
          <Loading/>
        }
      </Grid>
    </Grid>
  )
}

export default UserList