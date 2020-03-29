import React, { useState } from 'react'
import Contacts from './Contacts'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const addName = (event) => {
      event.preventDefault()
      const personObj = {
          name: newName
      }
      setPersons(persons.concat(personObj))
      setNewName('')
  }

  const onFormFieldChange = (event) => setNewName(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input onChange={onFormFieldChange} value={newName}/>
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