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

export const addNotification = (message, time) => {
    return dispatch => {
        dispatch({
             type: 'ADD',
             data: { message }
        })
        clearTimeout(messageTimeout)
        messageTimeout = setTimeout(() => {
            dispatch({
                type: 'CLEAR'
            })
        }, time * 1000)
    }
}

let messageTimeout

export default reducer

