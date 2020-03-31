import React, {useEffect, useState} from 'react';
import Filter from './components/Filter'
import DisplayCountries from './components/DisplayCountries'
import axios from 'axios'
import DisplayCountry from './components/DisplayCountry';



function App() {
  const [ countryData, setCountryData ] = useState([])
  const [ filter, setFilter ] = useState('')
  
  const scope = Filter.filteredData(countryData, filter)
  const single = () => scope.length === 1 ? scope[0] : null

  useEffect(() => {
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(res => {setCountryData(res.data)})
  }, [])

  const onFilterChange = (event) => setFilter(event.target.value)
  const onButtonClick = (data) => setFilter(data)

  return (
    <div>
      <Filter.filterBox onChange={onFilterChange} value={filter} />
      { 
        single() 
        ?
        <DisplayCountry country={scope[0]}/>
        :
        <DisplayCountries countryData={scope} onClick={onButtonClick}/>
      }
    </div>
  )
}

export default App;
