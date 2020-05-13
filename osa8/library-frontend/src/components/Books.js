import React, { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { ALL_BOOKS, ALL_GENRES } from '../queries'

const Books = ({show}) => {
  const [genre, setGenre] = useState(null)
  const genres = useQuery(ALL_GENRES)
  const [getBooks, { data }] = useLazyQuery(ALL_BOOKS)
  const [books, setBooks] = useState(null)
  useEffect(() => {
    if(genre){
          getBooks({ variables: { genre }})
    } else {
        getBooks()
    }
    if(data){
      setBooks(data.allBooks)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [genre, data])



  if(!show) return null

  if(!genres.data || !books ) return <div>loading...</div>

  return (
    <div>
      <h2>books</h2>
      <div><span></span></div>
      {
        genre ? 
        <div>in genre <strong>{genre}</strong></div> 
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
            books.map(a =>
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
          )}
        </tbody>
      </table>
      {genres.data.allGenres.map(g => <button key={g} onClick={() => setGenre(g)}>{g}</button>)}
      <button onClick={() => setGenre(null)}>all genres</button>
    </div>
  )
}

export default Books