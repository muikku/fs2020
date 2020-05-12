import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, SELF } from '../queries'

const Recommendations = ({show }) => {

  const books = useQuery(ALL_BOOKS)
  const usersFavoriteGenre = useQuery(SELF)

  if (!show) {
    return null
  }

  if(books.loading || usersFavoriteGenre.loading){
    return(
    <div>loading...</div>
    )
  }

  if(books.error || usersFavoriteGenre.error){
    console.log('error: ', books.error.message
    )
  }

  const favgenre = usersFavoriteGenre.data.me.favoriteGenre

  return (
    <div>
      <h2>recommendations</h2>
      <div><span></span></div>
      <div>books in your favorite genre <strong>{favgenre}</strong></div> 
      <div><span></span></div>
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
            .filter(b => b.genres.includes(favgenre))
            .map(a =>
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations