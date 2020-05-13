
import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import Login from './components/Login'
import Logout from './components/Logout'
import NewBook from './components/NewBook'
import Recommendations from './components/Recommendations'
import { useLazyQuery, useSubscription, useApolloClient } from '@apollo/client'
import { SELF, BOOK_ADDED, ALL_BOOKS } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [genre, setGenre] = useState(null)
  const [getGenre, {data}] = useLazyQuery(SELF)
  const client = useApolloClient()

  const updateCacheWith = (addedBook) => {
    console.log('added book: ', addedBook)
    console.log('added book id ', addedBook.id)
    const includedIn = (set, object) => 
    set.map(b => b.id).includes(object.id)

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    console.log('all books data in store: ', dataInStore.allBooks)
    if(!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks : dataInStore.allBooks.concat(addedBook)}
      })
    }

  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      updateCacheWith(addedBook)
    }
  })

  useEffect(() => {
    const tokenInStorage = localStorage.getItem('logged-library-user')
    if(tokenInStorage){
      setToken(tokenInStorage)
    }
  },[])

  useEffect(() => {
    if(token){
      getGenre()
    }
    if(data && data.me){
      setGenre(data.me.favoriteGenre)
    } 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, data])


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
        genre={genre}
      />

    </div>
  )
}

export default App