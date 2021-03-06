import React from 'react'

const DisplayCountry = ({country, weather}) => {
    return (
    <div>
        <h1>{country.name}</h1>
        <div>capital {country.capital}</div>
        <div>population {country.population}</div>
        <h2>languages</h2>
        <ul>
            {country.languages.map(e => <li key={e.name}>{e.name}</li>)}
        </ul>
        <img width={100} hight={100} src={country.flag} alt={`Flag of ${country.name}`}/>
        {
            !weather ? 
            <div>Loading data...</div> 
            :
            <div>
                <h2>Weather in {weather.location.name}</h2>
                <div><strong>temperature:</strong> {weather.current.temperature} Celcius</div>
                <img width={40} height={40} src={weather.current.weather_icons[0]} alt={weather.current.weather_descriptions[0]}/>
                <div><strong>wind:</strong> {weather.current.wind_speed} mph direction {weather.current.wind_dir}</div>
            </div>
        }
        
    </div>
    )
}

export default DisplayCountry