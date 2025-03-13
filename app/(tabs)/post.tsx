import { Feather } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, Platform, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import { Pressable, View } from 'react-native';
import { z } from 'zod';
import * as ImagePicker from "expo-image-picker";
import { ScrollView } from 'react-native';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/api';
import { useRouter } from 'expo-router';
import { Toast } from "toastify-react-native";

export const loginSchema = z.object({
  content: z.string().min(5, "O conteúdo é obrigatório.").max(220)
});

type PostData = {
  content: string;
}

const CreatePost: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);

  const router = useRouter();
  const navigation = useNavigation();
  const { user } = useAuth();

  const goBack = () => {
    navigation.goBack();
  }

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permissão necessária");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      selectionLimit: 5,
      quality: 1,
    });

    if (!result.canceled) {
      setImages((prevImages) => [...prevImages, result.assets[0].uri]);

    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Permissão necessária");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      quality: 1
    });

    if (!result.canceled) {
      setImages((prevImages) => [...prevImages, result.assets[0].uri]);
    }
  };

  const handleRemoveImage = (image: string) => {
    setImages(images.filter((img) => img !== image));
  }

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<PostData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange'
  });

  const inputRef = useRef<TextInput>(null);

  const onSubmit = async (data: PostData) => {
    console.log('opaa')

    let formData = new FormData();
    images.forEach((uri, index) => {
      console.log(uri)
      const fileExtension = uri.split(".").pop();
      const fileName = `upload_${index}.${fileExtension}`;
      const mimeType = `image/${fileExtension}`;

      formData.append("filesPost", {
        uri: Platform.OS === "android" ? uri : uri.replace("file://", ""),
        name: fileName,
        type: mimeType,
      } as any);
    });

    formData.append('conteudo', data.content);
    formData.append('tags', "123");
    formData.append('medicoId', user.id);
    try {
      // api.post('/post', formData)
        fetch('https://f2e4-2804-2f4-200-7928-48ab-772-ea84-6b0c.ngrok-free.app/post', {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': '*/*',
          },
        })
        .then(response => response.json())
        .then(data => {
          Toast.success("Postagem feita com sucesso.");
          router.replace("/(tabs)");
        }).catch((e) => {
          console.log(e.message)
        })
    } catch (error) {
      console.log('erro => ', error)
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, }}
    >
      <View style={style.container}>
        <View style={style.postHeader}>
          {/* <Pressable onPress={goBack}>
            <Text style={style.cancelText}>Cancelar</Text>
          </Pressable> */}

          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
          // disabled={!isValid}
          >
            <View style={[
              style.btnPost,
              { backgroundColor: isValid ? '#4C9EEB' : '#9ec1e2' }
            ]}>
              <Text style={style.textBtnPost}>Postar</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={style.contentPost}>
          <Controller
            control={control}
            name="content"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                ref={inputRef}
                multiline={true}
                numberOfLines={4}
                placeholder="O que está acontecendo?"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={style.textArea}
              />
            )}
          />
          {errors.content && <Text style={{ color: "red", marginLeft: 15 }}>{errors.content.message}</Text>}
        </View>

        <ScrollView horizontal style={style.imageScroll}>
          {images.map((img, index) => (
            <View style={style.imageItem}>
              <Pressable style={style.btnRemoveImage} onPress={() => handleRemoveImage(img)}>
                <Feather name='x' />
              </Pressable>
              <Image key={index} source={{ uri: img }} style={style.image} />
            </View>
          ))}
        </ScrollView>

        <View style={style.tabBarResources}>
          <Pressable onPress={pickImage}>
            <Feather name='image' size={36} color={'#4C9EEB'} />
          </Pressable>

          <Pressable onPress={takePhoto}>
            <Feather name='camera' size={36} color={'#4C9EEB'} />
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  postHeader: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  textareaContainer: {
    height: 180,
    padding: 5,
    backgroundColor: '#F5FCFF',
  },
  cancelText: {
    color: '#4C9EEB'
  },
  btnPost: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 35,
    fontWeight: 'bold',
    color: '#fff',
  },
  contentPost: {
    flex: 1,
    flexDirection: 'column',
  },
  textArea: {
    height: 'auto',
    borderColor: "gray",
    marginHorizontal: 5,
    fontSize: 16,
    padding: 10,
    borderRadius: 8,
    textAlignVertical: "top",
  },
  tabBarResources: {
    flex: 1,
    paddingHorizontal: 15,
    flexDirection: 'row',
    gap: 25
  },
  imageScroll: {
    marginTop: 20,
    maxHeight: 150,
    paddingHorizontal: 15
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  imageItem: {
    position: 'relative',
    zIndex: 1
  },
  btnRemoveImage: {
    width: 20,
    height: 20,
    borderRadius: 25,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    backgroundColor: '#9b9b9b',
    top: 5,
    right: 15,
    zIndex: 2
  },
  textBtnPost: {
    color: '#fff',
    fontWeight: 'bold'
  }
})

export default CreatePost;