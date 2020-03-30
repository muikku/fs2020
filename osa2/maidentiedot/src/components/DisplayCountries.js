import React, { useState } from 'react'
import DisplayCountry from './DisplayCountry'
import Button from './Button'

const DisplayCountries = ({countryData, weatherData, filter, onClick, getWeather}) => {
    const [ checkedWeather, setCheckedWearher ] = useState(false)
    const filteredData = countryData
    .filter(e => e.name
        .toLowerCase()
        .includes(filter
            .toLowerCase()
        )
    )
    
    if(filteredData.length > 10){
        if(checkedWeather){
            setCheckedWearher(false)
        }
        return(
            
            <div>Too many matches, specify another filter
            </div>
        )
    }

    if(filteredData.length === 1){
        if(!checkedWeather){
            getWeather(filteredData[0])
            setCheckedWearher(true)
        }    
        return (
            <DisplayCountry country={filteredData[0]} weather={weatherData}/>
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