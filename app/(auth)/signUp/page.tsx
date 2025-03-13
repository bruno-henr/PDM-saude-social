import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Text, View } from 'react-native';
import { z } from 'zod';
import * as Location from "expo-location";
import { Button } from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { api } from '@/api';
import { StyleSheet } from 'react-native';
import { Toast } from 'toastify-react-native';

export const loginSchema = z.object({
  apelido: z.string().min(5, "Apelido deve ter no minimo 5 caracteres"),
  nome: z.string().min(5, "Nome deve ter no minimo 5 caracteres"),
  crm: z.string().min(4, "CRM deve ter no minimo 4 caracteres"),
  email: z.string().email("Email inválido"),
  senha: z.string().min(3, "A senha deve ter pelo menos 3 caracteres"),
});

type LoginFormData = {
  apelido: string;
  nome: string;
  crm: string;
  email: string;
  senha: string;
};

const SignUp: React.FC = () => {
  const [location, setLocation] = useState<{
    latitude: number,
    longitude: number,
  }>({} as any);

  const router = useRouter();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permissão de localização negada");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      console.log('currentLocation => ', currentLocation.coords)
      setLocation(currentLocation.coords);
    })();
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange'
  });

  const onSubmit = async (data: LoginFormData) => {
    console.log('teste => ', JSON.stringify({
      latitude: location.latitude,
      longitude: location.longitude
    }))
    api.post('/medico/register', {
      ...data,
      hospital: JSON.stringify({
        latitude: location.latitude,
        longitude: location.longitude
      })
    }).then((response) => {
      Toast.success('Conta criada com sucesso!');
      router.replace("/(auth)/signIn/page");
    }).catch(e => {
      console.log('error:', e.message);
      Toast.error('Erro interno ao criar conta.')
    })
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <View style={style.headerLogin}>
        <Text style={style.title}>Criar conta</Text>
        <Text style={style.headerText}>A rede social exclusiva para médicos.</Text>
        <Text style={style.headerText}>Conecte-se com colegas, compartilhe conhecimentos e acompanhe as novidades da medicina.</Text>
      </View>

      <Text style={style.textInput}>Nome</Text>
      <Controller
        control={control}
        name="nome"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Digite seu nome aqui..."
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={style.input}
          />
        )}
      />
      {errors.nome && <Text style={{ color: "red" }}>{errors.nome.message}</Text>}

      <Text style={style.textInput}>Apelido</Text>
      <Controller
        control={control}
        name="apelido"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Digite seu apelido aqui..."
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={style.input}
          />
        )}
      />
      {errors.apelido && <Text style={{ color: "red" }}>{errors.apelido.message}</Text>}

      <Text style={style.textInput}>CRM</Text>
      <Controller
        control={control}
        name="crm"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Digite seu crm aqui..."
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={style.input}
          />
        )}
      />
      {errors.crm && <Text style={{ color: "red" }}>{errors.crm.message}</Text>}

      <Text style={style.textInput}>Email</Text>
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

      <Text style={style.textInput}>Senha</Text>
      <Controller
        control={control}
        name="senha"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Digite sua senha"
            secureTextEntry
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={style.input}
          />
        )}
      />
      {errors.senha && <Text style={{ color: "red" }}>{errors.senha.message}</Text>}

      <TouchableOpacity onPress={handleSubmit(onSubmit)}>
        <View style={style.btnSignIn}>
          <Text style={style.textBtnSignIn}>Criar conta</Text>
        </View>
      </TouchableOpacity>

      <View style={style.alignCenter}>
        <Text style={style.textCreateAccount}>
          Já tenho uma conta
        </Text>
        <TouchableOpacity onPress={() => {
          router.replace("/(auth)/signIn/page");
        }}>
          <Text style={style.createAccountCTA}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


const style = StyleSheet.create({
  alignCenter: {
    display: "flex",
    alignItems: 'center'
  },
  textCreateAccount: {
    textAlign: 'center'
  },
  createAccountCTA: {
    color: '#4C9EEB',
    fontWeight: 'bold',
    marginLeft: 5
  },
  textBtnSignIn: {
    color: '#fff',
    fontWeight: 'bold'
  },
  btnSignIn: {
    backgroundColor: '#4C9EEB',
    paddingVertical: 15,
    borderRadius: 40,
    marginVertical: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerLogin: {
    marginBottom: 20
  },
  headerText: {
    color: '#3d3d3d',
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: '#333232',
  },
  textInput: {
    color: '#919191'
  },
  input: {
    borderWidth: 1,
    marginBottom: 5,
    padding: 15,
    borderRadius: 40,
    marginVertical: 15
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  formControl: {
    flex: 1,
    flexDirection: 'column',
  }
})

export default SignUp;