# UPDATE - Ionic4 GraphQL Sample Application
## Starting to update this project here: https://github.com/aaronksaunders/ionic4-angular6-gql/tree/master


# Ionic2 GraphQL Sample Application

This is a starter project for [Ionic 2](http://ionicframework.com/docs/) with [GraphQL](http://graphql.org/) 

![Screenshot of App](https://raw.githubusercontent.com/aaronksaunders/ionic2-graphql-apollo-client/master/README.images/Screenshot%202017-07-23%2018.01.05.png)

This sample application integrating Ionic2 with GraphQL using the [Apollo Client for Angular2](http://dev.apollodata.com/angular2/)


## GraphQL Server
I am hosting the server on [Glitch](https://glitch.com) here - [aks-graphql-sample1](https://glitch.com/edit/#!/aks-graphql-sample1?path=README.md:1:0)

![glitch server screenshot](https://raw.githubusercontent.com/aaronksaunders/ionic2-graphql-apollo-client/master/README.images/Screenshot%202017-07-20%2008.46.59.png)

Because of CORS issues, I needed to make a modification to my graphQL server to work properly. [See the fix here](https://github.com/apollographql/apollo-client/issues/529#issuecomment-264536745)

## Apollo Client 
- Application shows basic user queries and  mutations
- Controlling the store and UI [using updateQueries](http://dev.apollodata.com/angular2/cache-updates.html#updateQueries) as a more efficient way to update the user interface without requerying the data
