import { api } from '@/api';
import { useAuth, UserData } from '@/context/AuthContext';
import { Feather } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Dimensions, Image, TextInput, TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { z } from 'zod';
import { Toast } from "toastify-react-native";
import { useNavigation } from 'expo-router';
import * as ImagePicker from "expo-image-picker";
import ImageProfile from '@/components/ImageProfile';

export const userSchema = z.object({
  nome: z.string(),
  apelido: z.string(),
  crm: z.string(),
  hospital: z.string(),
  email: z.string().email("Email inválido"),
});

type UserDataForm = Omit<UserData, "createdAt" | "updatedAt" | "imagem" | "senha" | "id">;


const Account: React.FC = () => {
  const [imageProfile, setImageProfile] = useState<string>('');
  const navigation = useNavigation();
  const { width } = Dimensions.get('window');
  const { logout } = useAuth();
  const { user } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserDataForm>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      ...user
    }
  });

  const onSubmit = async (data: UserDataForm) => {
    api.put('/medico', { ...data, id: user.id }).then((response) => {
      Toast.success('Dados de usuário atualizado')
      navigation.goBack();
    }).catch(e => {
      console.log('error:', e.message);
      Toast.error('Houve um erro interno ao tentar editar perfil')
    })
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permissão necessária");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false,
      selectionLimit: 1,
      quality: 1,
    });

    if (!result.canceled) {
      setImageProfile(result.assets[0].uri);
    }
  };

  return (
    <View style={style.container}>
      <TouchableOpacity onPress={pickImage}>
        <ImageProfile
          pickedImage={imageProfile}
          userImage={user.imagem}
          style={style.profile}
        />
      </TouchableOpacity>

      <View style={{ flex: 1, width: width - 40 }}>
        <Text>Nome</Text>
        <Controller
          control={control}
          name="nome"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Digite seu nome aqui"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={style.input}
            />
          )}
        />
        {errors.nome && <Text style={{ color: "red" }}>{errors.nome.message}</Text>}

        <Text>Apelido</Text>
        <Controller
          control={control}
          name="apelido"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Digite seu apelido aqui"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={style.input}
            />
          )}
        />
        {errors.apelido && <Text style={{ color: "red" }}>{errors.apelido.message}</Text>}

        <Text>CRM</Text>
        <Controller
          control={control}
          name="crm"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Digite seu crm aqui"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={style.input}
            />
          )}
        />
        {errors.crm && <Text style={{ color: "red" }}>{errors.crm.message}</Text>}

        <Text>Email</Text>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Digite seu email"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={style.input}
            />
          )}
        />
        {errors.email && <Text style={{ color: "red" }}>{errors.email.message}</Text>}

        <Text>Hospital</Text>
        <Controller
          control={control}
          name="hospital"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Digite seu hospital aqui"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={style.input}
            />
          )}
        />
        {errors.hospital && <Text style={{ color: "red" }}>{errors.hospital.message}</Text>}

        <TouchableOpacity onPress={handleSubmit(onSubmit)}>
          <View style={style.btnEdit}>
            <Feather size={28} name='edit-2' color={'#fff'} />
            <Text style={style.btnEditText}>Editar conta</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  profile: {
    borderRadius: 50,
    height: 120,
    width: 120,
    marginVertical: 50
  },
  input: {
    borderWidth: 1, borderColor: '#646161', borderRadius: 5, padding: 8, marginBottom: 5
  },
  btnEdit: {
    backgroundColor: '#4C9EEB',
    borderRadius: 60,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    color: '#fff',
    paddingVertical: 20,
    gap: 15,
    marginTop: 20
  },
  btnEditText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18
  }
})

export default Account;