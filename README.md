# reVue (Vue.js + GraphQL + Reddit API) App

reVue App: <https://revueapp.web.app/>

GraphQL Server: <https://revue-server.herokuapp.com/>

Github repository: <https://github.com/fabianparra/reVue>

## Overview

The challenge is to create a user interface using Vue.js framework that will be feeded using the [Reddit API](http://www.reddit.com/dev/api). The App will display the /top feed which displays the most recent and most popular posts on Reddit.

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

### GrapQL Types + Apollo Local Setup + PostDetail + Delete Mutation

- Added additional package for managing GraphQL code
- Added mutation for deleting posts on server and ui
- Updated PostDetail Component for showing current post
- Implemented Apollo Local setup for managing cached data
- Implemented refetch posts
- Added single post query for cached data

### App card states and styles

- Added new mutation for read posts
- Added styles for read posts
- Added animations for slide in an slide out posts
- General styling updates

### Responsive styles, Like posts

- Added responsive styles for mobile
- Added sidebar animations
- Added header and logo
- Added clear list button
- Added loader gif
- Added fields for author, time ago, comments number
- Added validation for post detail
- Added routing and refetch for header logo
- Added like posts array, route and toggle

### Final Adjustments

- Liked posts gallery
- Fix like toggle
- Clear out liked posts
- Added mobile navigation for liked posts

### Publish

- Deployed server to Heroku
- Deployed app to firebase static hosting

## To Improve

- Mobile views and scrolling
- Refetch not always updates the content in the ui
- Refetch does not always updates viewed posts state
- Show bigger image in modal
