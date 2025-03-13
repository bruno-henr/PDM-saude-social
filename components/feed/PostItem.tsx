import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import ButtonComment from './ButtonComment';
import ButtonLike from './ButtonLike';

interface Doctor {
  nome: string;
  id: string;
}

type Post = {
  conteudo: string,
  vits: number,
  id: string,
  files: any[],
  medicoId: string,
  tags: string,
  Comments: any[],
  doctor: Doctor,
}

interface IProps {
  post: Post;
}

const PostItem: React.FC<IProps> = ({ post }) => {
  return (
    <View style={style.container} key={post.id}>
      <View style={{ width: '18%' }}>
        <Image
          style={style.profile}
          source={require('../../assets/images/icon.png')}
        />
      </View>
      <View style={style.postContent}>
        <View style={style.authorContainer}>
          <Text style={style.author}>{post?.doctor?.nome}</Text>
        </View>
        <View>
          <Text style={{ textAlign: 'justify' }}>
            {post.conteudo}
          </Text>
          <View style={style.postInteraction}>
            <ButtonComment items={post.Comments.length} comments={post.Comments} id={post.id} />
            <ButtonLike items={post.vits} id={post.id} vits={post.vits} />
          </View>
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
    paddingVertical: 10
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

export default PostItem;