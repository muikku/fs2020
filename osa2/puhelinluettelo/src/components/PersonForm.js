import React from 'react';

const PersonForm = ({onFormNameChange, onFormNumberChange, addName, newName, newNumber}) => {
    return (
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
    )
}

export default PersonForm;