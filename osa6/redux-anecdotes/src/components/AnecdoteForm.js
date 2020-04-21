import React from 'react'
import { connect } from 'react-redux'
import { anecdoteCreate } from '../reducers/anecdoteReducer'
import { addNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
    const createAnecdote = async (event) => {
      event.preventDefault()
      const content = event.target.anecdote.value
      event.target.anecdote.value = ''
      props.anecdoteCreate({content: content, votes: 0})
      props.addNote(`you added '${content}'`, 5)
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

const connectedForm = connect(
  null,
  {
    anecdoteCreate,
    addNote: addNotification
  }
)(AnecdoteForm)

export default connectedForm