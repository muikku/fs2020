  
import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import Select from 'react-select'

import { ALL_AUTHORS, UPDATE_AUTHOR } from '../queries'


const Authors = (props) => {
  const authors = useQuery(ALL_AUTHORS)
  const [selected, setSelected] = useState(null)
  const [born, setBorn] = useState('')
  const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS }],
    onError: (error) => {
      console.log('error: ', error.graphQLErrors[0].message)
    }
  })

  if (!props.show) {
    return null
  }

  if(authors.error){
    console.log('error :', authors.error.message)
  }

  if(authors.loading){
    return <div>loading...</div>
  }

  const onFormSubmit = async (event) => {
    event.preventDefault()
    updateAuthor({
      variables: { name: selected.value, setBornTo: Number(born) }
    })
  }
  
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.data && authors.data.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      {
        props.token && authors.data &&
          <div>
            <h2>Set birthyear</h2>
            <form onSubmit={onFormSubmit}>
            <Select 
              label={selected}
              value={selected}
              onChange={(selected) => setSelected(selected)}
              options={authors.data.allAuthors.map(a => ({ value: a.name, label: a.name}))}
            />
            <input 
              label="born"
              type="number"
              value={born}
              onChange={(event) => setBorn(event.target.value)}
              required
            />
            <div>
              <button type="submit" >update author</button>
            </div>
            </form>
          </div>
        }
    </div>
  )
}

export default Authors
