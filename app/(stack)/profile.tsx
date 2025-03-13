import { api } from '@/api';
import PostItem from '@/components/feed/PostItem';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Profile: React.FC = () => {
    const { user } = useAuth();
    const [posts, setPosts] = useState([]);
    const router = useRouter();

    const fetchDoctor = async () => {
        api.get(`/post?medicoId=${user.id}`).then(response => {
            console.log('posts medico', response.data);
            setPosts(response.data.data);
        })
    }

    useEffect(() => {
        fetchDoctor();
    }, [])

    return (
        <View style={style.container}>
            <View style={style.backgroundProfileDefault} />

            <View style={style.contentMain}>
                <View style={style.headerProfile}>
                    <View style={style.profilePicture}>
                        <Image source={require("../../assets/images/react-logo.png")} />
                    </View>

                    <TouchableOpacity onPress={() => {
                        router.push({
                            pathname: '/(stack)/account'
                        })
                    }}>
                        <View style={style.btnEditProfile}>
                            <Text style={style.textBtn}>
                                Editar perfil
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View>
                    <Text style={style.profileNameText}>
                        {user.nome} - CRM {user.crm}
                    </Text>
                    <Text style={style.profileApelidoText}>
                        {user.apelido}
                    </Text>
                </View>

                <View style={{ marginTop: 30 }}>
                    <Text style={style.textTab}>
                        Minhas postagens
                    </Text>

                    <View style={{ marginTop: 10 }}>
                        {posts.length === 0 ? (
                            <Text style={style.textNoPosts}>
                                Nenhuma postagem feita
                            </Text>
                        ) : posts.map((post: any, index: number) => (
                            <PostItem post={post} key={index} />
                        ))}
                    </View>
                </View>
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    backgroundProfileDefault: {
        width: '100%',
        height: 150,
        backgroundColor: '#2e2d2d'
    },
    contentMain: {
        flex: 1,
        height: 120,
        flexDirection: 'column',
        paddingHorizontal: 10
    },
    headerProfile: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        flexDirection: 'row'
    },
    profilePicture: {
        borderRadius: 50,
        backgroundColor: '#000',
        position: 'relative',
        top: -30,
    },
    btnEditProfile: {
        borderWidth: 1,
        borderColor: '#4C9EEB',
        paddingVertical: 5,
        paddingHorizontal: 12,
        borderRadius: 20,
        marginTop: 10
    },
    textBtn: {
        color: '#4C9EEB',
        fontWeight: '800'
    },
    profileNameText: {
        fontWeight: 'bold', fontSize: 18
    },
    profileApelidoText: {
        fontWeight: '400', fontSize: 12, color: '#6e6e6e'
    },
    textTab: {
        color: '#4C9EEB',
        fontWeight: 'bold',
        fontSize: 16,
        borderBottomWidth: 2,
        borderColor: '#4C9EEB',
        width: 180,
        textAlign: 'center'
    },
    textNoPosts: {
        fontSize: 14, color: '#6e6e6e', textAlign: 'center', marginTop: 50
    }
})

export default Profile;