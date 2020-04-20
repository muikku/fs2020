const reducer = (state = [], action) => {
  switch(action.type){
    case 'CREATE':
      return state.concat(action.data)

    case 'VOTE':
      const find = state.find(a => a.id === action.data.id)
      return state.map(a => a.id === action.data.id ? { ...find, votes: find.votes + 1 } : a)

    case 'INIT_ANECDOTES':
      return action.data

    default:
      return state
  }
}

export const anecdoteVote = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export const anecdoteCreate = (anecdote) => {
  return {
    type: 'CREATE',
    data: anecdote
  }
}

export const initializeAnecdotes = (dotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: dotes
  }
}

export default reducer