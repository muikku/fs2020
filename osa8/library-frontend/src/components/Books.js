import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {

  const books = useQuery(ALL_BOOKS)
  const [filter, setFilter] = useState(null)

  if (!props.show) {
    return null
  }

  if(books.loading){
    return(
    <div>loading...</div>
    )
  }

  if(books.error){
    console.log('error: ', books.error.message
    )
  }

  const genres = books.data.allBooks.reduce((acc, curr) => {
    curr.genres.forEach(g => {
      if(!acc.includes(g)){
        acc.push(g)
      }
    })
    return acc
  }, [])

  return (
    <div>
      <h2>books</h2>
      <div><span></span></div>
      {
        filter ? 
        <div>in genre <strong>{filter}</strong></div> 
        : 
        <div>showing <strong>all genres</strong></div>
      }
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {
            books.data.allBooks
            .filter(b => filter ? b.genres.includes(filter) : b)
            .map(a =>
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
          )}
        </tbody>
      </table>
      {genres.map(g => <button key={g} onClick={() => setFilter(g)}>{g}</button>)}
      <button onClick={() => setFilter(null)}>all genres</button>
    </div>
  )
}

export default Books