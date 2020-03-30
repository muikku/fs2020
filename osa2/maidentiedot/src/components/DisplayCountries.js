import React from 'react'
import DisplayCountry from './DisplayCountry'

const DisplayCountries = ({data, filter}) => {
    const filteredData = data
    .filter(e => e.name
        .toLowerCase()
        .includes(filter
            .toLowerCase()
        )
    )

    if(filteredData.length === 1){
        return (
            <DisplayCountry country={filteredData[0]}/>
        )
    }
    return (
    <div>
        {filteredData.map(e => <div>{e.name}</div>)}
    </div>
    )
}

export default DisplayCountries