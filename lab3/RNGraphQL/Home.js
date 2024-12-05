import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useQuery, gql } from '@apollo/client';

const GET_DATA = gql`
  query {
    allItems {
      id
      name
    }
  }
`;

const Home = () => {
  const { loading, error, data } = useQuery(GET_DATA);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <View style={styles.container}>
      {data.allItems.map(item => (
        <Text key={item.id}>{item.name}</Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
