const { makeExecutableSchema, gql } = require('apollo-server')

const { 
  typeDef: Author,
  resolvers: authorResolvers 
} = require('./author')
const { 
  typeDef : Book,
  resolvers : bookResolvers 
} = require('./book')
const { 
  typeDef : User,
  resolvers : userResolvers
 } = require('./user')
const { 
  merge 
} = require('lodash')

const Query = gql`
  type Query 
  type Mutation 
  type Subscription 
`
let resolvers = {}

  const typeDefs = [
    Query,
    Author, 
    Book,  
    User,
  ] 
resolvers = merge(
    resolvers,
    authorResolvers, 
    bookResolvers,
    userResolvers
    )


module.exports = {typeDefs, resolvers}
