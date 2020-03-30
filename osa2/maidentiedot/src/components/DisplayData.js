import React from 'react'

const DisplayData = ({data, filter}) => {
    const filteredData = data
    .filter(e => e.name
        .toLowerCase()
        .includes(filter
            .toLowerCase()
        )
    )
    
    return (
    <div>
        {filteredData.map(e => <div>{e.name}</div>)}
    </div>
    )
}

export default DisplayData