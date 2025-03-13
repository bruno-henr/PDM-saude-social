import { Feather } from '@expo/vector-icons';
import { RelativePathString, useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { View } from 'react-native';

interface IProps {
    title: string;
    routerName: string;
}

const SettingButton: React.FC<IProps> = ({ title, routerName }) => {
    const router = useRouter();
    const route = `/(stack)/${routerName}`;
    
    return (
        <TouchableOpacity onPress={() => {
            router.push({
                pathname: route as RelativePathString,
            })
        }}>
            <View style={style.container}>
                <Text style={style.text}>{title}</Text>
                <Feather size={28} name="arrow-right" color={'#646262'} />
            </View>
        </TouchableOpacity>
    );
}

const style = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderWidth: .5,
        borderColor: '#ccc',
        backgroundColor: '#fff'
    },
    text: {
        color: '#000',
        fontSize: 16,
        fontWeight: 500
    }
})

export default SettingButton;