import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'


const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ search, setSearch ] = useState('')

  useEffect(() => {
    axios
    .get('http://localhost:3001/persons')
    .then(res => {
      setPersons(res.data)
    })
  }, [])

  const addName = (event) => {
      event.preventDefault()
      const personObj = {
          name: newName,
          number: newNumber
      }
      persons.map(e => e.name).includes(personObj.name) ? window.alert(`${personObj.name} is already added to phonebook`) :
      setPersons(persons.concat(personObj))
      setNewName('')
      setNewNumber('')
  }

  const onFormNameChange = (event) => setNewName(event.target.value)
  const onFormNumberChange = (event) => setNewNumber(event.target.value)
  const onSearchFieldChange = (event) => setSearch(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onSearchFieldChange={onSearchFieldChange} search={search} />

      <PersonForm 
        addName={addName} 
        onFormNameChange={onFormNameChange} 
        newName={newName}
        onFormNumberChange={onFormNumberChange} 
        newNumber={newNumber} 
      />
      <h2>Numbers</h2>
      <Persons data={persons} filter={search}/>
    </div>
  )

}

export default App