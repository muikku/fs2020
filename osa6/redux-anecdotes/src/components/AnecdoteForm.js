import React from 'react'
import { useDispatch } from 'react-redux'
import { anecdoteCreate } from '../reducers/anecdoteReducer'
import { addNote, clear } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const createAnecdote = async (event) => {
      event.preventDefault()
      const content = event.target.anecdote.value
      event.target.anecdote.value = ''
      dispatch(anecdoteCreate({content: content, votes: 0}))
      dispatch(addNote(`you added '${content}'`))
      setTimeout(() => {
        dispatch(clear())
      }, 5000)
  }

  return(
      <div>
    <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <div>
          <input name="anecdote"/>
          </div>
        <button type="submit">create</button>
      </form>
      </div>
  )
}

export default AnecdoteForm