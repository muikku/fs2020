const reducer = (state = 'null', action) => {
    switch(action.type) {
        case 'ADD':
            return action.data.message
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

export default reducer

