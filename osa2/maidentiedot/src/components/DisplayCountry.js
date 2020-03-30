import React from 'react'

const DisplayData = ({country}) => {
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
    </div>
    )
}

export default DisplayData