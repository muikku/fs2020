import { gql  } from '@apollo/client'

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    published
    author{
      name
      born
      bookCount
      id
    }
    genres
    id
  }
`
export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  
  ${BOOK_DETAILS}
`

export const AUTHOR_EDITED = gql`
  subscription {
    authorEdited {
      bookCount
      born
      id
    }
  }
  
`

export const ALL_AUTHORS = gql`
  query {
    allAuthors  {
      name
      born
      bookCount
      id
    }
  }
`

export const ALL_BOOKS = gql`
  query {
    allBooks {
      ...BookDetails
    }
  }


  ${BOOK_DETAILS}
`

export const BOOKS_BY_GENRE = gql`
  query booksByGenre($genre: String){
    allBooks (genre: $genre){
      ...BookDetails
    }
  }

  ${BOOK_DETAILS}
`

export const ALL_GENRES = gql`
  query{
    allGenres
  }
`

export const SELF = gql`
  query {
    me {
      favoriteGenre
    }
  }
`

export const ADD_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]){
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ){
      title
      author{
        name
      }
      published
      genres
    }
  }
`


export const UPDATE_AUTHOR = gql`
  mutation updateAuthor($name: String!, $setBornTo: Int!){
    editAuthor(
      name: $name,
      setBornTo: $setBornTo
    ){
      name
      born
      bookCount
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!){
    login(username: $username, password: $password) {
      value
    }
  }
`