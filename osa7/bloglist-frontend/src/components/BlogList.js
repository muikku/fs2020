import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper, Grid, Typography } from '@material-ui/core'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)
  if(blogs.length < 1){
    return <h3>No blogs atm... :/</h3>
  }
  return(
    <Grid container direction="column" justify="space-between" alignItems="stretch" spacing={3}>
      <Grid container alignItems="center" justify="center"  spacing={3}>
        <Grid item>
          <Typography variant="h2">Blogs</Typography>
        </Grid>
      </Grid>
      <Grid>
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              {blogs.sort((a, b) => b.likes - a.likes).map((blog) => (
                <TableRow key={blog.id}>
                  <TableCell>
                    <Link  to={`/blogs/${blog.id}`}>{blog.title} </Link>
                  </TableCell>
                  <TableCell>
                    {blog.author}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  )
}

export default BlogList