const reducer = (state = null, action) => {
    switch(action.type) {
        case 'ADD':
            return action.data.message
        case 'CLEAR':
            return null
        default: 
        return state
    }
}

export const addNote = (message, time) => {
    return dispatch => {
        dispatch({
             type: 'ADD',
             data: { message }
        })
        setTimeout(() => {
            dispatch({
                type: 'CLEAR'
            })
        }, time * 1000)
    }
}

export default reducer

