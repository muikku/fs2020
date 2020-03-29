import React, { useState } from 'react'
import Contacts from './Contacts'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1231244' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

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

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input onChange={onFormNameChange} value={newName}/>
        </div>
        <div>
          number: <input onChange={onFormNumberChange} value={newNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Contacts data={persons}/>
    </div>
  )

}

export default App