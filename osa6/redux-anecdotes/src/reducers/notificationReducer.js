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

export const addNote = (message) => {
    return {
        type: 'ADD',
        data: { message }
    }
}

export const clear = (message) => {
    return {
        type: 'CLEAR'
    }
}



export default reducer

