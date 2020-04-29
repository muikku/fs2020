import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@material-ui/core'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)
  if(blogs.length < 1){
    return <h3>No blogs atm... :/</h3>
  }
  return(
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
  )
}

export default BlogList