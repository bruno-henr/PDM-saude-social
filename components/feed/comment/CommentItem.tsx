import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

export type Reply = {
  conteudo: string,
  id: string,
  autor: string,
}

interface IProps {
  reply: Reply;
}

const ReplyItem: React.FC<IProps> = ({ reply }) => {
  return (
    <View style={style.container} key={reply.id}>
      <View style={{ width: '18%' }}>
        <Image
          style={style.profile}
          source={require('../../../assets/images/icon.png')}
        />
      </View>
      <View style={style.postContent}>
        <View style={style.authorContainer}>
          <Text style={style.author}>{reply.autor}</Text>
        </View>
        <View>
          <Text style={{ textAlign: 'justify' }}>
            {reply.conteudo}
          </Text>
        </View>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    borderBottomColor: '#c8cbce',
    borderBottomWidth: .5,
    borderTopColor: '#c8cbce',
    borderTopWidth: .5,
    paddingBottom: 5,
    paddingTop: 5,
  },
  profile: {
    borderRadius: 50,
    height: 60,
    width: 60,
    marginTop: 2,
  },
  postContent: {
    width: '82%',
    display: 'flex',
    flexDirection: 'column',
  },
  author: {
    fontWeight: 'bold',
    fontSize: 14
  },
  authorId: {
    fontWeight: 'ultralight',
    color: '#888787'
  },
  authorContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5
  },
  postInteraction: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    width: '100%',
    marginTop: 5,
  }
});

export default ReplyItem;