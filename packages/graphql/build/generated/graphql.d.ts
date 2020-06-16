import * as VueApolloComposable from '@vue/apollo-composable';
import * as VueCompositionApi from '@vue/composition-api';
export declare type Maybe<T> = T | null;
export declare type Exact<T extends {
    [key: string]: any;
}> = {
    [K in keyof T]: T[K];
};
export declare type ReactiveFunction<TParam> = () => TParam;
/** All built-in and custom scalars, mapped to their actual values */
export declare type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
};
export declare type Query = {
    __typename?: 'Query';
    posts: Array<Post>;
};
export declare type QueryPostsArgs = {
    cursor?: Maybe<Scalars['String']>;
    limit?: Maybe<Scalars['Int']>;
    count?: Maybe<Scalars['Int']>;
};
export declare type Post = {
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
export declare type Mutation = {
    __typename?: 'Mutation';
    deletePost: Scalars['ID'];
};
export declare type MutationDeletePostArgs = {
    id: Scalars['ID'];
};
export declare type DeletePostMutationVariables = Exact<{
    id: Scalars['ID'];
}>;
export declare type DeletePostMutation = ({
    __typename?: 'Mutation';
} & Pick<Mutation, 'deletePost'>);
export declare type PostsQueryVariables = Exact<{
    cursor?: Maybe<Scalars['String']>;
    limit?: Maybe<Scalars['Int']>;
    count?: Maybe<Scalars['Int']>;
}>;
export declare type PostsQuery = ({
    __typename?: 'Query';
} & {
    posts: Array<({
        __typename?: 'Post';
    } & Pick<Post, 'id' | 'author' | 'created' | 'cursor' | 'image' | 'num_comments' | 'thumbnail' | 'title'>)>;
});
export declare const DeletePostDocument: import("graphql").DocumentNode;
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
export declare function useDeletePostMutation(options: VueApolloComposable.UseMutationOptionsWithVariables<DeletePostMutation, DeletePostMutationVariables>): VueApolloComposable.UseMutationReturn<DeletePostMutation, Exact<{
    id: string;
}>, VueApolloComposable.MutateWithOptionalVariables<DeletePostMutation, Exact<{
    id: string;
}>>>;
export declare type DeletePostMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<DeletePostMutation, DeletePostMutationVariables>;
export declare const PostsDocument: import("graphql").DocumentNode;
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
export declare function usePostsQuery(variables?: PostsQueryVariables | VueCompositionApi.Ref<PostsQueryVariables> | ReactiveFunction<PostsQueryVariables>, options?: VueApolloComposable.UseQueryOptions<PostsQuery, PostsQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<PostsQuery, PostsQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<PostsQuery, PostsQueryVariables>>): VueApolloComposable.UseQueryReturn<PostsQuery, Exact<{
    cursor?: string | null | undefined;
    limit?: number | null | undefined;
    count?: number | null | undefined;
}>>;
export declare type PostsQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<PostsQuery, PostsQueryVariables>;
