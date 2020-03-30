import React, {useEffect, useState} from 'react';
import Filter from './components/Filter'
import DisplayCountries from './components/DisplayCountries'
import axios from 'axios'


function App() {
  const [ countryData, setCountryData ] = useState([])
  const [ filter, setFilter ] = useState('')

  useEffect(() => {
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(res => {setCountryData(res.data)})
  }, [])

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
