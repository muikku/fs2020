import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  switch(action.type){
    case 'CREATE':
      return state.concat(action.data)

    case 'VOTE':
      const found = state.find(a => a.id === action.data)
      return state.map(a => a.id === action.data ? { ...found, votes: found.votes + 1 } : a)

    case 'INIT_ANECDOTES':
      return action.data

    default:
      return state
  }
}

export const anecdoteVote = (anecdote) => {
  return async dispatch => {
    await anecdoteService.update(anecdote.id, {...anecdote, votes: anecdote.votes + 1})
    dispatch({
    type: 'VOTE',
    data: anecdote.id
    })
  }
}

export const anecdoteCreate = anecdote => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.create(anecdote)
    dispatch({
      type: 'CREATE',
      data: newAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export default reducer