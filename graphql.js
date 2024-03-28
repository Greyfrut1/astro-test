import { ApolloClient, InMemoryCache, gql } from '@apollo/client/core';

const client = new ApolloClient({
  uri: 'http://drupal-vnu.docksal.site/graphq2', // Замініть на URL вашого GraphQL API
  cache: new InMemoryCache(),
});


export const query = gql`
  query {
    nodeQuery {
      entities {
        entityLabel
      }
    }
  }
`;

export default client;