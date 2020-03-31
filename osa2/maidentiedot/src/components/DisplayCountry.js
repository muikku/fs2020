import React, { useEffect, useState } from 'react'
import axios from 'axios'

const DisplayCountry = ({country}) => {

    const api_key = process.env.REACT_APP_API_KEY
    const [ weather, setWeatherData ] = useState(null)

    useEffect(() => {
        const params = {
            access_key: api_key,
            query: country.capital
        }
        axios
        .get('http://api.weatherstack.com/current', {params})
        .then(res => {setWeatherData(res.data)})
    }, [])

    if(!weather){
        return (
        <div>Loading data...</div>
        )
    }

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
        <h2>Weather in {weather.location.name}</h2>
        <div>temperature: {weather.current.temperature} Celcius</div>
        <img width={40} height={40} src={weather.current.weather_icons[0]} alt={weather.current.weather_descriptions[0]}/>
        <div>wind: {weather.current.wind_speed} mph direction {weather.current.wind_dir}</div>
    </div>
    )
}

export default DisplayCountry