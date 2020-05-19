const User = require('../models/user')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const { UserInputError, gql } = require('apollo-server')
const secret = process.env.SECRET

const typeDef= `
  extend type Query {
    me: User
  }
  extend type Mutation {
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
  }
`

const resolvers = {
  Query: {
    me: (root, args, context) => {
      return context.currentUser
    },
  },
  Mutation: {
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

module.exports = {
  typeDef,
  resolvers
}