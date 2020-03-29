import React, { useState } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'


const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ search, setSearch ] = useState('')

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