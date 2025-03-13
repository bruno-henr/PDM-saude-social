import { Stack } from 'expo-router';
import 'react-native-reanimated';

export default function AuthLayout() {
    return (
        <Stack>
            <Stack.Screen name="signIn/page" options={{ headerShown: false }} />
            <Stack.Screen name="signUp/page" options={{ headerShown: false }} />
        </Stack>
    );
}