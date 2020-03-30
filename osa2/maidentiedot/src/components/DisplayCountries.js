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

    if(filteredData.length > 10){
        return(
            <div>Too many matches, specify another filter</div>
        )
    }

    if(filteredData.length === 1){
        return (
            <DisplayCountry country={filteredData[0]}/>
        )
    }

    if(filteredData.length === 0){
        return (
            <div>There is nothing... specify another filter</div>
        )
    }

    
    return (
    <div>
        {filteredData.map(e => <div key={e.name}>{e.name}</div>)}
    </div>
    )
}

export default DisplayCountries