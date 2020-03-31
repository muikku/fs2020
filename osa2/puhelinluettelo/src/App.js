import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import contactService from './services/contacts'


const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ search, setSearch ] = useState('')

  useEffect(() => {
    contactService.getAll().then(res => {setPersons(res)})
    .catch(err => {
      console.log('err')
    })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    const personObj = {
        name: newName,
        number: newNumber
    }
    persons.map(e => e.name).includes(personObj.name) ? window.alert(`${personObj.name} is already added to phonebook`) :
    contactService.create(personObj).then(resObj => {
      setPersons(persons.concat(resObj))
    })
    
    setNewName('')
    setNewNumber('')
  }

  const removeContact = (id) => {
    contactService
    .remove(id)
    .catch(err => {
      console.log('err')
    })
    const updatedContacts = persons.filter(e => e.id !== id)
    setPersons(updatedContacts)
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
      <Persons data={persons} filter={search} del={removeContact}/>
    </div>
  )

}

export default App