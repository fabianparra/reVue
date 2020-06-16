import gql from 'graphql-tag';
import * as VueApolloComposable from '@vue/apollo-composable';
import * as VueCompositionApi from '@vue/composition-api';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
export type ReactiveFunction<TParam> = () => TParam;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  posts: Array<Post>;
};


export type QueryPostsArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  count?: Maybe<Scalars['Int']>;
};

export type Post = {
  __typename?: 'Post';
  id: Scalars['ID'];
  author: Scalars['String'];
  created: Scalars['Float'];
  cursor: Scalars['String'];
  image: Scalars['String'];
  num_comments: Scalars['Int'];
  thumbnail: Scalars['String'];
  title: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  deletePost: Scalars['ID'];
};


export type MutationDeletePostArgs = {
  id: Scalars['ID'];
};

export type DeletePostMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeletePostMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deletePost'>
);

export type PostsQueryVariables = Exact<{
  cursor?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  count?: Maybe<Scalars['Int']>;
}>;


export type PostsQuery = (
  { __typename?: 'Query' }
  & { posts: Array<(
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'author' | 'created' | 'cursor' | 'image' | 'num_comments' | 'thumbnail' | 'title'>
  )> }
);


export const DeletePostDocument = gql`
    mutation DeletePost($id: ID!) {
  deletePost(id: $id)
}
    `;

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useDeletePostMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePostMutation(options: VueApolloComposable.UseMutationOptionsWithVariables<DeletePostMutation, DeletePostMutationVariables>) {
            return VueApolloComposable.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument, options);
          }
export type DeletePostMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<DeletePostMutation, DeletePostMutationVariables>;
export const PostsDocument = gql`
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
    `;

/**
 * __usePostsQuery__
 *
 * To run a query within a Vue component, call `usePostsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = usePostsQuery(
 *   {
 *      cursor: // value for 'cursor'
 *      limit: // value for 'limit'
 *      count: // value for 'count'
 *   }
 * );
 */
export function usePostsQuery(variables?: PostsQueryVariables | VueCompositionApi.Ref<PostsQueryVariables> | ReactiveFunction<PostsQueryVariables>, options: VueApolloComposable.UseQueryOptions<PostsQuery, PostsQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<PostsQuery, PostsQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<PostsQuery, PostsQueryVariables>> = {}) {
            return VueApolloComposable.useQuery<PostsQuery, PostsQueryVariables>(PostsDocument, variables, options);
          }
export type PostsQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<PostsQuery, PostsQueryVariables>;