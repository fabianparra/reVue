import gql from 'graphql-tag'

export const POSTS_QUERY = gql`
  query posts($cursor: String, $limit: Int, $count: Int) {
    posts(cursor: $cursor, limit: $limit, count: $count) {
      id
      author
      created
      cursor
      image
      num_comments
      thumbnail
      title
    }
  }
`
