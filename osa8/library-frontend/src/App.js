
import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import Login from './components/Login'
import Logout from './components/Logout'
import NewBook from './components/NewBook'
import Recommendations from './components/Recommendations'
import { useSubscription, useApolloClient, useQuery } from '@apollo/client'
import { BOOK_ADDED, ALL_BOOKS, ALL_AUTHORS, ALL_GENRES, SELF, AUTHOR_EDITED, BOOKS_BY_GENRE } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()
  const getGenre = useQuery(SELF)

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => 
    set.map(b => b.id).includes(object.id)
    const author = addedBook.author
    const genres = addedBook.genres
    const booksInStore = client.readQuery({ query: ALL_BOOKS })
    const authorsInStore = client.readQuery({ query: ALL_AUTHORS })
    const rootQuery = client.cache.data.data.ROOT_QUERY
    const inRoot = key => key in rootQuery
    if(inRoot('allBooks') && !includedIn(booksInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks : booksInStore.allBooks.concat(addedBook)}
      })
    }
    if(!includedIn(authorsInStore.allAuthors, author)) {
      client.writeQuery({
        query: ALL_AUTHORS,
        data: { allAuthors : authorsInStore.allAuthors.concat(author)}
      })
    }
    if(addedBook.genres.length > 0){
      const genresInStore = client.readQuery({ query: ALL_GENRES })
      genres.forEach(genre => {
        if( !genresInStore.allGenres.includes(genre)) {
          client.writeQuery({
            query: ALL_GENRES,
            data: { allGenres : genresInStore.allGenres.concat(genre)}
          })
        }
      })
      addedBook.genres.forEach(genre => {
        if(inRoot(`allBooks({"genre":"${genre}"})`)){
        const booksByGenreInStore = client.readQuery({ query: BOOKS_BY_GENRE, variables: { genre: genre } })
        if((!includedIn(booksByGenreInStore.allBooks, addedBook) && addedBook.genres.includes(genre))) {
          client.writeQuery({
            query: BOOKS_BY_GENRE, variables: { genre: genre } ,
            data: { allBooks : booksByGenreInStore.allBooks.concat(addedBook)}
          })
        }
      }
      })
    }
  }
    
  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      updateCacheWith(addedBook)
    }
  })

  useSubscription(AUTHOR_EDITED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const editedAuthor = subscriptionData.data.authorEdited
      const authorsInStore = client.readQuery({ query: ALL_AUTHORS })
      const updatedStore = authorsInStore.allAuthors.map(a => a.id === editedAuthor.id ? editedAuthor : a)
      client.writeQuery({
        query: ALL_AUTHORS,
        data: { allAuthors : updatedStore}
      })
    }
  })

  useEffect(() => {
    const tokenInStorage = localStorage.getItem('logged-library-user')
    if(tokenInStorage){
      setToken(tokenInStorage)
    }
  },[])


  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        
        {!token ? 
          <button onClick={() => setPage('login')}>login</button>
          :
          <span>
            <button onClick={() => setPage('add')}>add book</button>
            <Logout setPage={setPage} setToken={setToken}/>
            <button onClick={() => setPage('recommend')}>recommend</button>
          </span>         
        }
        
      </div>

      <Authors
        token={token}
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

      <Login 
        setToken={setToken} 
        setPage={setPage} 
        show={page === 'login'} 
      />

      <Recommendations 
        show={page === 'recommend'}
        getGenre={getGenre}
      />

    </div>
  )
}

export default App