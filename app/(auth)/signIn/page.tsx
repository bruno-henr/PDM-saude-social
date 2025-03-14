import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/api";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import { Toast } from "toastify-react-native";
import * as Network from "expo-network";

export const loginSchema = z.object({
    email: z.string().email("Email inválido"),
    senha: z.string().min(3, "A senha deve ter pelo menos 6 caracteres"),
});

type LoginFormData = {
    email: string;
    senha: string;
};

const Login: React.FC = () => {
    const { login } = useAuth();
    const router = useRouter();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "123123@gmail.com",
            senha: "123"
        }
    });

    const onSubmit = async (data: LoginFormData) => {
        api.post('/medico/login', data).then((response) => {
            const { token, userData } = response.data;

            login(token, userData);
        }).catch(e => {
            console.log('error:', e.message);
            Toast.error('Email ou senha incorreto')
        })
    };

    useEffect(async () => {
        const ip = await Network.getIpAddressAsync();
        console.log('ip => ', ip)
      }, [])

    return (
        <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
            <View style={style.headerLogin}>
                <Text style={style.title}>Entrar na conta</Text>
                <Text style={style.headerText}>A rede social exclusiva para médicos.</Text>
                <Text style={style.headerText}>Conecte-se com colegas, compartilhe conhecimentos e acompanhe as novidades da medicina.</Text>
            </View>

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
                    <Text style={style.textBtnSignIn}>Entrar na conta</Text>
                </View>
            </TouchableOpacity>

            <View style={style.alignCenter}>
                <Text style={style.textCreateAccount}>
                    Não tem uma conta?
                </Text>
                <TouchableOpacity onPress={() => {
                    router.replace("/(auth)/signUp/page");
                }}>
                    <Text style={style.createAccountCTA}>Criar conta</Text>
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

export default Login;