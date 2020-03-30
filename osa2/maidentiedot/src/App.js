import React, {useEffect, useState} from 'react';
import axios from 'axios'


function App() {
  const [ countryData, setCountryData ] = useState([])

  useEffect(() => {
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(res => {setCountryData(res.data)})
  }, [])

  return (
    <div>
      Hellow
    </div>
  )
}

export default App;
