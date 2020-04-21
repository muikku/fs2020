import React from 'react'

const Message = ({message}) => {
    if(!message){
        return (<></>)
    }
    return (
        <div>
            {message}
        </div>
    )
}

export default Message