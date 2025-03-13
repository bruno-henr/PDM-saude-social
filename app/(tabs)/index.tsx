import { ScrollView, StyleSheet, View } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import PostItem from '@/components/feed/PostItem';
import { useEffect, useState } from 'react';
import { api } from '@/api';
import { Button } from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { useQuery } from '@tanstack/react-query';

export default function HomeScreen() {

  const [posts, setPosts] = useState([]);
  const { logout } = useAuth();
  const { isPending, error, data, refetch } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const response = await api.get('/post');
      console.log('data posts => ', response.data.data)
      return response.data.data;
    }
  });

  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message


  refetch();



  return (
    <ThemedView style={styles.container}>
      <ScrollView>
        {data.map((post: any, index: number) => (
          <PostItem post={post} key={index} />
        ))}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    padding: 5,
    paddingBottom: 100
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
