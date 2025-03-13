import { Stack } from 'expo-router';
import React from 'react';

const LayoutStack: React.FC = () => {
    return (
        <Stack>
            <Stack.Screen
                name="comments"
            />
            <Stack.Screen
                name="settings"
                options={{
                    title: 'Configurações'
                }}
            />

            <Stack.Screen
                name="aboutUs"
                options={{
                    title: 'Sobre nós'
                }}
            />

            <Stack.Screen
                name="account"
                options={{
                    title: 'Dados de usuário'
                }}
            />

            <Stack.Screen
                name="profile"
                options={{ headerShown: false }}
            />
        </Stack>
    );
}

export default LayoutStack;