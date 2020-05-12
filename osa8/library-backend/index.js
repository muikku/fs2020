const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
require('dotenv').config()
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET
const { v1: uuidv1 } = require('uuid')

mongoose.set('useFindAndModify', false)

console.log('connecting to ', process.env.MONGODB_URI)

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true } )
.then(() => {
  console.log('connected to MongoDB')
})
.catch((error) => {
  console.log('error connection to MongoDB: ', error.message)
})

const typeDefs = gql`
  type Book {
      title: String!
      published: Int!
      author: Author!
      genres: [String!]
  }
  type Author {
      name: String!
      born: Int
      bookCount: Int
  }

  type Query {
      bookCount: Int!
      authorCount: Int!
      allBooks(author: String, genre: String): [Book!]!
      allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
        title: String!
        author: String!
        published: Int!
        genres: [String!]
    ): Book
    editAuthor(
        name: String!
        setBornTo: Int!
    ): Author
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: (root, args) => {
      let search = {}
      if(args.author){
        search = { ...search, author: args.author}
      } else if ( args.genre){
        search = { ...search, genres: args.genre }
      }
      return Book.find(search)
    },
    allAuthors: () => Author.find({})
  },
  Book:{
    author: async (root) => {
      try{
        const author = await Author.findById(root.author)
        return author
      } catch (error) {
        console.log('error: ', error.message)
      }
    }
  },
  Author:  {
    name: (root) => root.name,
    bookCount: (root) => {
      return Book.collection.countDocuments({ author: root._id })
    }
  },
  Mutation: {
    addBook: async (root, args) => {
        const authorInDb = await Author.findOne({ name: args.author})
        if(authorInDb){
            const book = new Book({ ...args, author: authorInDb })
            try{
              await book.save()
            } catch (error){
              throw new UserInputError(error.message, {
                invalidArgs: args,
              })
            }
            return book
        }
        const newAuthor = new Author({ name: args.author })
        const book = new Book({ ...args, author: newAuthor })
        try{
          await newAuthor.save()
          await book.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
        return book
    },
    editAuthor: async (root, args) => {
        const authorInDb = await Author.findOne({ name: args.name })
        authorInDb.born = args.setBornTo
        try{
          await authorInDb.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args
          })
        }
        
        return authorInDb
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})