import React, { useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Recommendations = ({ show, genre }) => {
  const [favorite, setFavorite] = useState(null)
  const [books, {data}] = useLazyQuery(ALL_BOOKS)
  const [recoms, setRecoms] = useState(null)

  useEffect(() => {
    if(genre && show ){
      setFavorite(genre)
      books({ variables: { genre }})
    }
    if(data){
      setRecoms(data.allBooks)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [genre, show, books, data])


  if(!show) return null

  if(!genre || !data || !recoms) return <div>loading...</div>

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