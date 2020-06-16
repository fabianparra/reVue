import { GraphQLServer } from 'graphql-yoga'
import axios from 'axios'
import * as querystring from 'querystring'
import config from './config/env'

const { BASE_URL, OAUTH_URL, REFRESH_TOKEN, APP_ID, SECRET } = config

const baseUrl = process.env.BASE_URL || BASE_URL
const oauthUrl = process.env.OAUTH_URL || OAUTH_URL
const refreshToken = process.env.REFRESH_TOKEN || REFRESH_TOKEN
const appId = process.env.APP_ID || APP_ID
const secret = process.env.SECRET || SECRET

const resolvers = {
  Query: {
    async posts(_: any, args: any) {
      try {
        // Get token
        const body = {
          grant_type: 'refresh_token',
          refresh_token: refreshToken,
        }
        const config = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          auth: {
            username: appId,
            password: secret,
          },
        }
        const freshToken = await axios.post(
          `${baseUrl}/api/v1/access_token`,
          querystring.stringify(body),
          config,
        )

        const token = freshToken.data.access_token
        const queryArgs = querystring.stringify({
          ...args,
          after: args.cursor,
        })

        // Get posts
        if (token) {
          const result = await axios.get(`${oauthUrl}/top?${queryArgs}`, {
            headers: {
              Authorization: `bearer ${token}`,
            },
          })

          const data = result.data.data

          const posts = data.children.map(post => {
            const postImg = post.data.preview
              ? post.data.preview.images[0].source.url.replace(/&amp;/g, '&')
              : ''

            return {
              ...post,
              cursor: post.data.name,
              image: postImg,
            }
          })

          return posts
        }
      } catch (e) {
        console.log('Get posts error:', e)
      }
    },
  },
  Mutation: {
    deletePost(_: any, { id }) {
      return id
    },
  },
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
})

server.start(() => console.log(`Server is running on http://localhost:4000`))
