import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import TrendingRepos from './components/getTrendingRepos';
import RepoDetail from './components/RepoDetail';
import client from './apolloClient';

const Stack = createStackNavigator();

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name="TrendingRepos" 
            component={TrendingRepos} 
            options={{ title: 'Trending Repos' }} 
          />
          <Stack.Screen 
            name="RepoDetail" 
            component={RepoDetail} 
            options={{ title: 'Repo Details' }} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}
