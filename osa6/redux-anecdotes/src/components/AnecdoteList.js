import { useSelector, useDispatch } from 'react-redux'
import { anecdoteVote } from '../reducers/anecdoteReducer'
import React from 'react'


const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes.sort((a, b) => b.votes - a.votes))
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(anecdoteVote(id))
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
                    <button onClick={() => vote(anecdote.id)}>vote</button>
                </div>
            </div>
        )}
        </div>
    )
}

export default AnecdoteList