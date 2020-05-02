import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper, Grid, Typography } from '@material-ui/core'
import Loading from './Loading'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)

  return(
    <Grid container direction="column" justify="space-between" alignItems="stretch" spacing={3}>
      <Grid container alignItems="center" justify="center"  spacing={3}>
        <Grid item>
          <Typography variant="h2">Blogs</Typography>
        </Grid>
      </Grid>
      <Grid item>
        {blogs.length >= 1 ?
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
          :
          <Loading />
        }
      </Grid>
    </Grid>
  )
}

export default BlogList