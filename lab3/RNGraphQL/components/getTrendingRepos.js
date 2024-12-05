import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, Linking, TouchableOpacity } from 'react-native';
import { gql, useQuery } from '@apollo/client';

const GET_TRENDING_REPOS = gql`
  query {
    search(query: "stars:>10000", type: REPOSITORY, first: 10) {
      edges {
        node {
          ... on Repository {
            name
            description
            url
            stargazerCount
            forkCount
            owner {
              login
              avatarUrl
            }
          }
        }
      }
    }
  }
`;

const TrendingRepos = () => {
  const { loading, error, data } = useQuery(GET_TRENDING_REPOS);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <FlatList
      data={data.search.edges}
      keyExtractor={(item) => item.node.url}
      renderItem={({ item }) => {
        const repo = item.node;
        return (
          <TouchableOpacity onPress={() => Linking.openURL(repo.url)}>
            <View style={styles.card}>
              <Image source={{ uri: repo.owner.avatarUrl }} style={styles.avatar} />
              <View style={styles.info}>
                <Text style={styles.name}>{repo.name}</Text>
                <Text>{repo.description}</Text>
                <Text>⭐ {repo.stargazerCount} | 🍴 {repo.forkCount}</Text>
                <Text>👤 {repo.owner.login}</Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default TrendingRepos;
