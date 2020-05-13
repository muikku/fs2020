import React, { useEffect, useState } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { ALL_BOOKS, SELF } from '../queries'

const Recommendations = ({ show }) => {
  const genre = useQuery(SELF)
  const [favorite, setFavorite] = useState(null)
  const [books, {data}] = useLazyQuery(ALL_BOOKS)
  const [recoms, setRecoms] = useState(null)

  useEffect(() => {
    if(genre.data){
      setFavorite(genre.data.me.favoriteGenre)
      books({ variables: { genre: genre.data.me.favoriteGenre }})
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [genre.data])

  useEffect(() => {
    if(data){
      setRecoms(data.allBooks)
    }
  },[data])

  if(!show) return null

  if(!genre.data || !data) return null

  return (
    <div>
      <h2>recommendations</h2>
      <div><span></span></div>
      <div>books in your favorite genre <strong>{favorite}</strong></div> 
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
          {recoms
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