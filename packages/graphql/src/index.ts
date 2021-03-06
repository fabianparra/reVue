import gql from 'graphql-tag'

export const typeDefs = gql`
  type Query {
    posts(cursor: String, limit: Int, count: Int): [Post!]!
  }

  type Post {
    id: ID!
    author: String!
    created: Float!
    cursor: String!
    image: String!
    num_comments: Int!
    thumbnail: String!
    title: String!
  }

  type Mutation {
    deletePost(id: ID!): ID!
  }
`

export * from './generated/graphql'
