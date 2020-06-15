# reVue (Vue.js + GraphQL + Reddit API) App

## Overview

The requirement is to create a user interface using Vue.js framework that will be feeded using the [Reddit API](http://www.reddit.com/dev/api). The App will display the /top feed which displays the most recent and most popular posts on Reddit.

## Challenges / Notes

- Use the Reddit Rest API as a GraphQL database

## Dev Plan

In order to accomplish the requierment in the given time I'll create a minimal plan to organize how would the development be approached.

### Day 1 - App overview and planning, API Setup and Testing

- Review App requirements
- Review Reddit's API docs and setup requirements
- Test API with Postman
- Initialize repository
  - Will make use of a monorepo to host both client and server code.

### Day 2 - GraphQL Server + Vue App Scaffolding

- Initialize a GraphQL server using graphql-yoga
- Create GraphQL schema and resolvers
- Vue App create folder and file structure for Components

### Day 3 - Vue App Components

- Create Components logic
- Implement Routing
- Add general styles

### Day 4 - Vue App Animations

- Add application animations
- Add additional styles

### Day 5 - Detailing and adjustments

- If needed add cosmetic styles and adjustments

## DEV Logs

### Initial setup

- Create Monorepo setup using Yarn Workspaces
- Boostrap Vue app with vue cli: vue create client
- Minimal server with grapqhl-yoga and Typescript
- Install concurrently
- add initial scripts for dev

### Server - GraphQL Wrapper for Reddit's rest API

- Created reddit api application for generating a permanent token
- Added implementation of refresh token
- Added Posts schema
- Added Posts resolver
- Implemented custom field mapping
- Fixed image url encoding issues
- Added setup for environment variables

### reVue App Components

- Implement Apollo
- Initial layout template
- Update Vue router
- PostList Component
- PostCard Component
- PostDetail Component
- Implement pagination with fetchMore
