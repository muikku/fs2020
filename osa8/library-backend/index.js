const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
require('dotenv').config()
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET

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

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  
  type Token {
    value: String!
  }

  type Query {
      bookCount: Int!
      authorCount: Int!
      allBooks(author: String, genre: String): [Book!]!
      allAuthors: [Author!]!
      me: User
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

    createUser(
      username: String!
      favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  
  Query: {
    me: (root, args, context) => {
      return context.currentUser
    },
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
      } catch (error){
        console.log(error.message)
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
    editAuthor: async (root, args, context) => {
        const currentUser = context.currentUser
        if(!currentUser){
          throw new AuthenticationError("not authenticated")
        }
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
    },
    createUser: (root, args) => {
      const user = new User({ ...args})
       return user.save()
       .catch(error => {
         throw new UserInputError(error.message, {
           invalidArgs: args
         })
       })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username})
      if( !user || args.password !== 'secret'){
        throw new UserInputError("wrong credentials")
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, secret)}
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if(auth && auth.toLowerCase().startsWith('bearer ')){
      const decodedToken = jwt.verify(
        auth.substring(7), secret
      )
      const currentUser = await User.findById(decodedToken.id)
      return {currentUser}
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})