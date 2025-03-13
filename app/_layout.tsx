import { DarkTheme, DefaultTheme, NavigationContainer, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useNavigation, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { StatusBar as StatusBarNative } from 'react-native'
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import { AuthProvider } from '@/context/AuthContext';
import ToastManager from "toastify-react-native";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Comments from './(stack)/comments';

const queryClient = new QueryClient()

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const navigation = useRouter();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView>

      <AuthProvider>
        <ThemeProvider value={
          // colorScheme === 'dark' ? DarkTheme : 
          DefaultTheme
        }>
          <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
              <QueryClientProvider client={queryClient}>

                <ToastManager textStyle={{ fontSize: 14 }} />
                <StatusBar style="dark" />

                <Stack>
                  <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                  <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                  <Stack.Screen name="(stack)" options={{ headerShown: false }} />
                  <Stack.Screen name="settings" />
                  {/* <Stack.Screen
                      name="comments"
                      options={{
                        headerShown: true,
                        headerBackVisible: true,
                        gestureEnabled: true
                      }}
                    /> */}
                  <Stack.Screen name="+not-found" />
                </Stack>
              </QueryClientProvider>
            </SafeAreaView>
          </SafeAreaProvider>
        </ThemeProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
