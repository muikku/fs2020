import React, {useEffect, useState} from 'react';
import Filter from './components/Filter'
import DisplayCountries from './components/DisplayCountries'
import axios from 'axios'


function App() {
  const [ countryData, setCountryData ] = useState([])
  const [ weatherData, setWeatherData ] = useState([])
  const [ filter, setFilter ] = useState('')
  const api_key = process.env.REACT_APP_API_KEY
  useEffect(() => {
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(res => {setCountryData(res.data)})
  }, [])

  
  const getWeather = (text) => {
    const params = {
      access_key: api_key,
      query: text
    }
    axios
      .get('http://api.weatherstack.com/current',{params})
      .then(res => {setWeatherData(res.data)})
  }
  useEffect(() =>{
    getWeather('Oslo')
  },[])

  const onFilterChange = (event) => setFilter(event.target.value)
  const onButtonClick = (data) => setFilter(data)

  return (
    <div>
      <Filter onChange={onFilterChange} value={filter} />
      <DisplayCountries 
        data={countryData} 
        filter={filter}
        onClick={onButtonClick}
      />
    </div>
  )
}

export default App;
