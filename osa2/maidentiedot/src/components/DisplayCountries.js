import React from 'react'
import DisplayCountry from './DisplayCountry'
import Button from './Button'

const DisplayCountries = ({data, filter, onClick}) => {
    const filteredData = data
    .filter(e => e.name
        .toLowerCase()
        .includes(filter
            .toLowerCase()
        )
    )

    if(filteredData.length > 10){
        return(
            
            <div>Too many matches, specify another filter
            </div>
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
        {filteredData.map(e => 
            <div 
                key={e.name}>
                {e.name} 
                <Button onClick={() => onClick(e.name)} text="show"/> 
            </div>
        )}
    </div>
    )
}

export default DisplayCountries