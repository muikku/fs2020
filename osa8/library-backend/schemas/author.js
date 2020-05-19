const Author = require('../models/author')
const { UserInputError, AuthenticationError, PubSub, gql } = require('apollo-server')
const pubsub = new PubSub()

const typeDef= `
  extend type Query {
    authorCount: Int!
    allAuthors: [Author!]!
  }
  extend type Subscription {
    authorEdited: Author!
  }
  extend type Mutation {
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
  type Author {
    name: String!
    born: Int
    books: [Book]!
    bookCount: Int!
    id: ID!
  }
`
const resolvers = {
  Query: {
    authorCount: () => Author.collection.countDocuments(),
    allAuthors: () => Author.find({}).populate('books'),
  },
  Author: {
    name: (root) => root.name,
    bookCount: (root) => root.books.length,
    books: (root) => root.books
    .map(b => Book.findById(b)
    .populate('author')),
    id: (root) => root._id
  },
  Mutation: {
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      if(!currentUser){
        throw new AuthenticationError("not authenticated")
      }
      const authorInDb = await Author.findOne({ name: args.name })
      authorInDb.born = args.setBornTo
      try{
        await authorInDb.save()
        pubsub.publish('AUTHOR_EDITED', { authorEdited: authorInDb})
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
      
      return authorInDb
    }
  },
  Subscription: {
    authorEdited: {
      subscribe: () => pubsub.asyncIterator(['AUTHOR_EDITED'])
    }
  }
}

module.exports = {
  typeDef,
  resolvers
}
