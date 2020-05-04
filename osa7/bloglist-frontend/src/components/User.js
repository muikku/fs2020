import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Typography, Table, TableBody, TableContainer, Paper, TableRow, TableCell, Grid } from '@material-ui/core'

const User = () => {
  const id = useParams().id
  const users = useSelector(state => state.users)

  const user = users.find(u => u.id === id)
  if(!user){
    return null
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