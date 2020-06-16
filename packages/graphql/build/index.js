var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import gql from 'graphql-tag';
export var typeDefs = gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type Query {\n    posts(cursor: String, limit: Int, count: Int): [Post!]!\n  }\n\n  type Post {\n    id: ID!\n    author: String!\n    created: Float!\n    cursor: String!\n    image: String!\n    num_comments: Int!\n    thumbnail: String!\n    title: String!\n  }\n\n  type Mutation {\n    deletePost(id: ID!): ID!\n  }\n"], ["\n  type Query {\n    posts(cursor: String, limit: Int, count: Int): [Post!]!\n  }\n\n  type Post {\n    id: ID!\n    author: String!\n    created: Float!\n    cursor: String!\n    image: String!\n    num_comments: Int!\n    thumbnail: String!\n    title: String!\n  }\n\n  type Mutation {\n    deletePost(id: ID!): ID!\n  }\n"])));
export * from './generated/graphql';
var templateObject_1;
//# sourceMappingURL=index.js.map