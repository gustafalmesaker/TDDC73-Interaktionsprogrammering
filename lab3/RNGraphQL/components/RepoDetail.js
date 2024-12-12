import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const RepoDetails = ({ route }) => {
  const { repo } = route.params; // Destructure the `repo` object passed as a parameter

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{repo.name}</Text>
      <Text style={styles.description}>{repo.description}</Text>
      <Text>⭐ Stars: {repo.stargazerCount}</Text>
      <Text>🍴 Forks: {repo.forkCount}</Text>
      <Text>Owner: {repo.owner.login}</Text>
      <Text>Primary Language: {repo.primaryLanguage?.name || 'N/A'}</Text>
      <Text>Last Updated: {repo.pushedAt}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default RepoDetails;
