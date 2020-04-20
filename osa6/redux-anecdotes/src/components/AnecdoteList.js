import { useSelector, useDispatch } from 'react-redux'
import { anecdoteVote } from '../reducers/anecdoteReducer'
import { addNote, clear } from '../reducers/notificationReducer'
import React from 'react'


const AnecdoteList = () => {
  let anecdotes = useSelector(state => state.anecdotes.sort((a, b) => b.votes - a.votes))
  const filter = useSelector(state => state.filter)
  if(filter !== ''){
    anecdotes = anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
  }
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