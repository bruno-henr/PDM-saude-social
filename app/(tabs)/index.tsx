import { ScrollView, StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import PostItem from '@/components/feed/PostItem';
import { api } from '@/api';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import * as Network from "expo-network";

export default function HomeScreen() {
  const { isPending, error, data, refetch } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const response = await api.get('/post');
      return response.data.data;
    }
  });

  useEffect(async () => {
    const ip = await Network.getIpAddressAsync();
    console.log('ip => ', ip)
  }, [])

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
