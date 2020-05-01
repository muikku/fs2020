import { useField } from '../hooks'
import { createComment } from '../reducers/commentReducer'
import { TextField, Typography } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import React from 'react'

const Comments = ({ blog }) => {
  const comment = useField('text')
  const comments = useSelector(state => state.comments.filter(c => c.blogId === blog.id))
  const dispatch = useDispatch()

  const handleCommenting = (event) => {
    event.preventDefault()
    try{
      const newComment = {
        comment: comment.value
      }
      dispatch(createComment(newComment, blog.id))
      comment.onSubmit()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <Typography>{comments.length} comments</Typography>
      <form onSubmit={handleCommenting}>
        <TextField label="add comment" inputProps={comment}/>
      </form>
      {comments.map(c => <Typography  key={c.id}>{c.comment}</Typography>)}

    </div>
  )
}

export default Comments