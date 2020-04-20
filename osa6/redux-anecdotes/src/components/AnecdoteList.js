import { useSelector, useDispatch } from 'react-redux'
import { anecdoteVote } from '../reducers/anecdoteReducer'
import { addNote, clear } from '../reducers/notificationReducer'
import React from 'react'


const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes.sort((a, b) => b.votes - a.votes))
  const dispatch = useDispatch()

  const vote = (id, content) => {
    dispatch(anecdoteVote(id))    
    dispatch(addNote(`you voted '${content}'`))
    setTimeout(() => {
      dispatch(clear())
    }, 5000)
    console.log('vote', id)
  }
    return (
        <div>
        {anecdotes.map(anecdote =>
            <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
                </div>
            </div>
        )}
        </div>
    )
}

export default AnecdoteList