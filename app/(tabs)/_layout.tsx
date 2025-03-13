import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { TabBar } from '@/components/BottomTab';
import { CustomHeader } from '@/components/HeaderCustom';
import { SearchProvider } from '@/context/SeachContext';
import { View } from 'react-native';
import Search from './search';
import { Feather } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <SearchProvider>
      <Tabs
        tabBar={props => <TabBar {...props} />}
        screenOptions={({ navigation, route }) => ({
          header: () => <CustomHeader navigation={navigation} route={route} />,
        })}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Inicio',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            title: 'Pesquisar',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
          }}
        />
        <Tabs.Screen
          name="post"
          options={{
            title: 'Criar',
            tabBarIcon: ({ color }) => <Feather size={28} name="plus" color={color} />,
          }}
        />
      </Tabs>
    </SearchProvider>
  );
}
