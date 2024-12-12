import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, Linking, TouchableOpacity, TextInput } from 'react-native';
import { gql, useQuery } from '@apollo/client';

const GET_TRENDING_REPOS = gql`
  query GetTrendingRepos {
    search(query: "stars:>1", type: REPOSITORY, first: 20) {
      edges {
        node {
          ... on Repository {
            name
            description
            url
            stargazerCount
            forkCount
            createdAt
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
  const [since, setSince] = useState("2015-01-01"); // Default date

  // Use the 'useQuery' hook to fetch the data
  const { loading, error, data } = useQuery(GET_TRENDING_REPOS, {
    variables: { since }, // Pass the 'since' state variable to the query
  });
  

  console.log(data);  // Log to check if data is being fetched

  // Filter repositories based on 'since' date
  const filteredRepos = data
    ? data.search.edges.filter((repo) => {
        const repoCreatedAt = new Date(repo.node.createdAt);
        const sinceDate = new Date(since);

        // Strip time component by setting both dates to midnight
        repoCreatedAt.setHours(0, 0, 0, 0);
        sinceDate.setHours(0, 0, 0, 0);

        console.log("Repo created at:", repoCreatedAt, "Since date:", sinceDate);  // Log for debugging
        return repoCreatedAt >= sinceDate;
      })
    : [];

  const handleDateChange = (date) => {
    setSince(date);
  };

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  // If no repositories match the filter
  if (filteredRepos.length === 0) {
    return <Text>No repositories found for the given date filter.</Text>;
  }

  return (
    <View style={styles.container}>
      {/* Input for custom date */}
      <TextInput
        style={styles.input}
        placeholder="Enter a date (YYYY-MM-DD)"
        value={since}
        onChangeText={handleDateChange}
      />

      {/* Display filtered repositories */}
      <FlatList
        data={filteredRepos}
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
                  <Text>Created at: {repo.createdAt}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
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
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingLeft: 8,
    marginBottom: 10,
  },
});

export default TrendingRepos;
