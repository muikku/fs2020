const Author = require('../models/author')
const Book = require('../models/book')
const { UserInputError, AuthenticationError, PubSub, gql } = require('apollo-server')
const pubsub = new PubSub()

const typeDef = `
  extend type Query {
    bookCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allGenres: [String!]!
  }
  extend type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]
  ): Book
  }
  extend type Subscription {
    bookAdded: Book!
  }
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]
    id: ID!
  }
`


const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    allBooks: (root, args) => {
      let search = {}
      if(args.author){
        search = { ...search, author: args.author}
      } else if ( args.genre){
        search = { ...search, genres: args.genre }
      }
      return Book.find(search).populate('author')
    },
    allGenres: () => Book.distinct( "genres" ),
  },
  Book:{
    author: (root) => Author
    .findById(root.author)
    .populate('books')
    ,
    id: (root) => root._id
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const authorInDb = await Author.findOne({ name: args.author})
      const currentUser = context.currentUser
      if(!currentUser){
        throw new AuthenticationError("not authenticated")
      }
      if(authorInDb){
          const book = new Book({ ...args, author: authorInDb })
          try{
            await book.save()
            authorInDb.books = authorInDb.books.concat(book.id)  
            await authorInDb.save()
            pubsub.publish('BOOK_ADDED', { bookAdded: book})
            return book
          } catch (error){
            throw new UserInputError(error.message, {
              invalidArgs: args,
            })
          }
      }
      const newAuthor = new Author({ name: args.author, books: [] })
      const book = new Book({ ...args, author: newAuthor })
      try{
        await newAuthor.save()
        await book.save()
  
        newAuthor.books = newAuthor.books.concat(book.id)
        book.author = newAuthor.id
  
        await book.save()
        await newAuthor.save()
  
        pubsub.publish('BOOK_ADDED', { bookAdded: book })
      } catch (error) {
        console.log(error)
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return book
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }
}

module.exports = {
  typeDef,
  resolvers
}