import React from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Pressable } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';


interface IProps {
  items: number;
  comments: any[];
  id: string;
}

const ButtonComment: React.FC<IProps> = ({ items, comments, id }) => {
  const queryClient = useQueryClient();
  const navigation = useRouter();

  const handleNavigate = () => {
    queryClient.setQueryData(["comments"], { comments, id });
    navigation.push({
      pathname: "/(stack)/comments",
      params: { postagemId: id }
    });
  };

  return (
    <Pressable onPress={handleNavigate}>
      <View style={style.container}>
        <View style={style.icon}>
          <Image
            source={require('../../assets/images/comment-icon.png')}
          />
        </View>
        <Text style={style.quantity}>{items}</Text>
      </View>
    </Pressable>
  );
}

const style = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    width: 'auto',
    alignItems: 'center',
  },
  icon: {
    width: 15,
    height: 14.51
  },
  quantity: {
    color: '#747474',
  }
});

export default ButtonComment;