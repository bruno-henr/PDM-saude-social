import { api } from '@/api';
import CommentItem from '@/components/feed/comment';
import ReplyItem, { Reply } from '@/components/feed/comment/CommentItem';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';
import { useNavigation } from 'expo-router';
import { useRouter } from 'expo-router';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useEffect, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, Keyboard, LogBox, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Platform } from 'react-native';
import { TextInput } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import { Pressable, StyleSheet } from 'react-native';
import { Text, View } from 'react-native';
import { Toast } from 'toastify-react-native';
import { z } from 'zod';
LogBox.ignoreAllLogs();
type CommentData = {
    conteudo: string;
    // postagemId: string;
}

export const loginSchema = z.object({
    conteudo: z.string().min(5, "O conteúdo é obrigatório.").max(220),
    // postagemId: z.string(),
});

const Comments: React.FC = () => {
    const inputRef = useRef<TextInput>(null);
    const router = useRouter();
    const { postagemId } = useLocalSearchParams();
    console.log('local => ', postagemId)

    const queryClient = useQueryClient();

    const postCommentData: any = queryClient.getQueryData(["comments"]);
    // console.log('postCommentData => ', postCommentData)
    postCommentData.comments.map(e => console.log('comment => ', e))

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<CommentData>({
        resolver: zodResolver(loginSchema),
        mode: 'onChange',
    });

    const onSubmit = async ({ conteudo }: CommentData) => {
        console.log('data => ', { conteudo, postagemId })
        api.post('/comment/register', { conteudo, postagemId }).then(() => {
            Toast.success('Comentário enviado');
            queryClient.invalidateQueries({ queryKey: ['posts'] })
            router.replace('/(tabs)');
        }).catch(() => {
            Toast.error('Erro ao enviar comentário')
        })
    }

    return (

        <View style={style.container} pointerEvents="auto">
            <View style={style.contentPost}>
                <Controller
                    control={control}
                    name="conteudo"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            ref={inputRef}
                            editable={true}
                            multiline={true}
                            numberOfLines={4}
                            placeholder="Deixe aqui seu comentário..."
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            style={style.textArea}
                        />
                    )}
                />
                {errors.conteudo && <Text style={{ color: "red", marginLeft: 15 }}>{errors.conteudo.message}</Text>}
            </View>
            <View style={style.postHeader}>
                <Pressable
                    onPress={handleSubmit(onSubmit)}
                    disabled={!!errors.conteudo}
                    pointerEvents='box-none'
                >
                    <View style={[
                        style.btnPost,
                        { backgroundColor: isValid ? '#4C9EEB' : '#9ec1e2' }
                    ]}>
                        <Text style={style.textBtnPost}>Responder</Text>
                    </View>
                </Pressable>
            </View>

            <View style={style.listComments}>
                {postCommentData?.comments?.length === 0 && <Text style={{ color: '#ccc' }}>Sem comentários</Text>}
                {postCommentData?.comments?.map((reply: Reply) => (
                    <ReplyItem reply={reply} />
                ))}
            </View>
        </View>
    );
}


const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    postHeader: {
        width: '100%',

        paddingHorizontal: 15,
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
        width: 120,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 35,
        fontWeight: 'bold',
        color: '#fff',
    },
    contentPost: {
        width: '100%',
        height: 'auto',
        flexDirection: 'column',
    },
    textArea: {
        height: 70,
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
    },
    listComments: {
        flex: 1,
        paddingTop: 15,
        alignItems: 'center'
    }
})

export default Comments;