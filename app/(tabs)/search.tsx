import { api } from '@/api';
import PostItem from '@/components/feed/PostItem';
import ProfileItem from '@/components/ProfileItem';
import PostViewTab from '@/components/TabView/PostViewTab';
import { useSearch } from '@/context/SeachContext';
import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';


const Search: React.FC = () => {
  const { searchQuery } = useSearch();
  const [searchData, setSearchData] = useState({ "doctors": [], "posts": [] });

  const fetchPostOrDoctor = async () => {
    api.get(`/search?query=${searchQuery}`).then(response => {
      console.log('search => ', response.data)
      setSearchData(response.data)
    })
  }

  useEffect(() => {
    fetchPostOrDoctor();
  }, [searchQuery])

  if (!searchQuery) {
    return (
      <View style={style.center}>
        <Text style={style.noResult}>Nenhum resultado.</Text>
      </View>
    );
  }

  return (
    <View style={style.container}>
      <Text style={style.title}>Perfil</Text>
      {(searchData['doctors'] && searchData['doctors']?.length === 0) ? (
        <View style={style.textCenter}>
          <Text style={style.noResult}>Nenhum perfil encontrado</Text>
        </View>
      ) : (
        <View>
          {searchData['doctors'].map((doctor: any) => (
            <ProfileItem doctor={doctor} />
          ))}
        </View>
      )}

      <Text style={style.title}>Postagens</Text>
      {(searchData['posts'] && searchData['posts']?.length === 0) ? (
        <View style={style.textCenter}>
          <Text style={style.noResult}>Nenhuma postagem encontrado</Text>
        </View>
      ) : (
        <View style={style.containerListPosts}>
          {searchData['posts'].map((post: any, index: number) => (
            <PostItem post={post} key={index} />
          ))}
        </View>
      )}
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    paddingVertical: 15
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  noResult: {
    color: '#9b9b9b',
    fontSize: 16,
    textAlign: 'center'
  },
  title: {
    fontSize: 18,
    color: '#4C9EEB',
    fontWeight: 'bold',
    marginLeft: 10
  },
  textCenter: {
    width: '100%',
    paddingVertical: 10
  },
  containerListPosts: {
    paddingVertical: 10
  }
})

export default Search;