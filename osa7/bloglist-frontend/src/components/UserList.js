import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { TableContainer, Paper, Table, TableCell, TableHead, TableBody, TableRow, makeStyles, Container } from '@material-ui/core'


const UserList = () => {
  const users = useSelector(state => state.users)
  const useStyles = makeStyles({
    table: {
      maxWidth: 600
    }
  })
  const classes = useStyles()
  return(
    <Container maxWidth="sm">
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="a dense table">
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
                  <Link to={`/users/${user.id}`}>{user.username}</Link>
                </TableCell>
                <TableCell align="right" scope="row">{user.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}

export default UserList