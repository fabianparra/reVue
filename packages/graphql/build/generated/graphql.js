var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import gql from 'graphql-tag';
import * as VueApolloComposable from '@vue/apollo-composable';
export var DeletePostDocument = gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    mutation DeletePost($id: ID!) {\n  deletePost(id: $id)\n}\n    "], ["\n    mutation DeletePost($id: ID!) {\n  deletePost(id: $id)\n}\n    "])));
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
export function useDeletePostMutation(options) {
    return VueApolloComposable.useMutation(DeletePostDocument, options);
}
export var PostReadDocument = gql(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    mutation PostRead($id: ID!) {\n  postRead(id: $id)\n}\n    "], ["\n    mutation PostRead($id: ID!) {\n  postRead(id: $id)\n}\n    "])));
/**
 * __usePostReadMutation__
 *
 * To run a mutation, you first call `usePostReadMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `usePostReadMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = usePostReadMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePostReadMutation(options) {
    return VueApolloComposable.useMutation(PostReadDocument, options);
}
export var PostsDocument = gql(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    query posts($cursor: String, $limit: Int, $count: Int) {\n  posts(cursor: $cursor, limit: $limit, count: $count) {\n    id\n    author\n    created\n    cursor\n    image\n    num_comments\n    thumbnail\n    title\n    read\n  }\n}\n    "], ["\n    query posts($cursor: String, $limit: Int, $count: Int) {\n  posts(cursor: $cursor, limit: $limit, count: $count) {\n    id\n    author\n    created\n    cursor\n    image\n    num_comments\n    thumbnail\n    title\n    read\n  }\n}\n    "])));
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
export function usePostsQuery(variables, options) {
    if (options === void 0) { options = {}; }
    return VueApolloComposable.useQuery(PostsDocument, variables, options);
}
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=graphql.js.map