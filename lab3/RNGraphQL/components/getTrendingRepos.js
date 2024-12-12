import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Linking } from 'react-native';
import { gql, useQuery } from '@apollo/client';

const languages = ["All", "JavaScript", "TypeScript", "HTML","Python", "Java", "C++", "Ruby", "Go"]; // Language options

const GET_TRENDING_REPOS = gql`
  query GetTrendingRepos($query: String!) {
    search(query: $query, type: REPOSITORY, first: 20) {
      edges {
        node {
          ... on Repository {
            name
            description
            url
            stargazerCount
            forkCount
            pushedAt
            owner {
              login
              avatarUrl
            }
            primaryLanguage {
              name
            }
          }
        }
      }
    }
  }
`;

const TrendingRepos = () => {
  const [timeFrame, setTimeFrame] = useState("last week");
  const [selectedLanguage, setSelectedLanguage] = useState("All");

  const calculateStartDate = () => {
    const today = new Date();
    switch (timeFrame) {
      case "last month":
        today.setMonth(today.getMonth() - 1);
        break;
      case "last year":
        today.setFullYear(today.getFullYear() - 1);
        break;
      default:
        today.setDate(today.getDate() - 7);
    }
    return today.toISOString().split("T")[0];
  };

  const startDate = calculateStartDate();

  const generateQuery = () => {
    const languageFilter = selectedLanguage !== "All" ? `language:${selectedLanguage}` : "";
    return `stars:>1 pushed:>${startDate} ${languageFilter}`;
  };

  const { loading, error, data } = useQuery(GET_TRENDING_REPOS, {
    variables: { query: generateQuery() },
  });

  const repos = data?.search?.edges || [];

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <View style={styles.container}>
      {/* Time Frame Buttons */}
      <View style={styles.filterContainer}>
        {["last week", "last month", "last year"].map((frame) => (
          <TouchableOpacity
            key={frame}
            onPress={() => setTimeFrame(frame)}
            style={[
              styles.filterButton,
              timeFrame === frame && styles.selectedFilterButton,
            ]}
          >
            <Text style={styles.filterText}>{frame}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Language Dropdown */}
      <View style={styles.filterContainer}>
        {languages.map((lang) => (
          <TouchableOpacity
            key={lang}
            onPress={() => setSelectedLanguage(lang)}
            style={[
              styles.filterButton,
              selectedLanguage === lang && styles.selectedFilterButton,
            ]}
          >
            <Text style={styles.filterText}>{lang}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Repository List */}
      <FlatList
        data={repos}
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
                  <Text>Language: {repo.primaryLanguage?.name || "N/A"}</Text>
                  <Text>Last updated: {repo.pushedAt}</Text>
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
  filterContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  filterButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    marginHorizontal: 5,
  },
  selectedFilterButton: {
    backgroundColor: "#007bff",
    borderColor: "#0056b3",
  },
  filterText: {
    color: "black",
    fontWeight: "bold",
  },
  card: {
    flexDirection: "row",
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    backgroundColor: "#fff",
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
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default TrendingRepos;
