import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { api } from '@/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
const heartIcon = require('../../assets/images/heart-icon.png');
const heartSolidIcon = require('../../assets/images/heart-solid-icon.png');

interface IProps {
  items: number;
  id: string;
  vits: number;
}

const ButtonLike: React.FC<IProps> = ({ items, id, vits }) => {
  const [liked, setLiked] = useState(false);

  const queryClient = useQueryClient()

  const updatePost = async ({ id, newVits }: { id: string, newVits: number }) => {
    return await api.put('/post', { id, vits: String(newVits) }).then(() => {
    }).catch(() => console.log('bad'))
  };

  const updatePostMutation = useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      setLiked((prev) => !prev);
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
    onError: () => {
    }
  })

  const onToggleLike = () => {
    console.log('Like button clicked');
    const value = !liked;
    const newVits = value ? vits + 1 : vits - 1;

    updatePostMutation.mutate({
      id,
      newVits,
    });
    
  };

  return (
    <Pressable onPress={onToggleLike}>
      <View style={style.container}>
        <View>
          <Image
            style={style.icon}
            source={liked ? heartSolidIcon : heartIcon}
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
    alignItems: 'center',
  },
  icon: {
    width: 15,
    height: 14
  },
  quantity: {
    color: '#747474',
  }
});

export default ButtonLike;