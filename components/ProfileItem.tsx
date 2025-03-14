import React from 'react';
import { Text } from 'react-native';
import { Image } from 'react-native';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import ImageProfile from './ImageProfile';

interface IProps {
    doctor: {
        nome: string,
        imagem?: string
    }
}

const ProfileItem: React.FC<IProps> = ({ doctor }) => {
    return (
        <View style={style.containerPerfil}>
            <View style={{ width: '18%' }}>
                <ImageProfile 
                    pickedImage=''
                    style={style.profile}
                    userImage={doctor.imagem || ''}
                />
            </View>
            <View style={style.postContent}>
                <View style={style.authorContainer}>
                    <Text style={style.author}>{doctor.nome}</Text>
                </View>
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    containerPerfil: {
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
        justifyContent: 'center'
    },
    authorContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 5
    },
    author: {
        fontWeight: 'bold',
        fontSize: 14
    },
});

export default ProfileItem;