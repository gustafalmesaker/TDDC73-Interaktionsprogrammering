import React from 'react';
import { ApolloProvider } from '@apollo/client';
import TrendingRepos from './components/getTrendingRepos'
import client from './apolloClient';
import Home from './Home';

export default function App() {
  return (
    <ApolloProvider client={client}>
      <TrendingRepos/>
    </ApolloProvider>
  );
}
