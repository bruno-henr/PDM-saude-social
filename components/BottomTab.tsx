import { View, Platform, StyleSheet, LayoutChangeEvent } from 'react-native';
import { useLinkBuilder, useTheme } from '@react-navigation/native';
import { Text, PlatformPressable } from '@react-navigation/elements';
import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import TabBarButton from './TabBarButton';
import { useEffect, useState } from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

export function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
    const { colors } = useTheme();
    const [dimensions, setDimensions] = useState({ height: 20, width: 100 });

    const buttonWidth = dimensions.width / state.routes.length;

    const onTabBarLayout = (e: LayoutChangeEvent) => {
        setDimensions({
            height: e.nativeEvent.layout.height,
            width: e.nativeEvent.layout.width
        })
    }

    const tabPositionX = useSharedValue(0);

    useEffect(() => {
        tabPositionX.value = withSpring(buttonWidth * state.index, { duration: 1500 });
    }, [state.index]);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: tabPositionX.value }]
        }
    })

    return (
        <View onLayout={onTabBarLayout} style={style.tabBar}>
            <Animated.View
                style={[animatedStyle, {
                    position: 'absolute',
                    backgroundColor: '#723feb',
                    borderRadius: 30,
                    marginHorizontal: 12,
                    height: dimensions.height - 15,
                    width: buttonWidth - 25
                }]}
            />
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label: any =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    tabPositionX.value = withSpring(buttonWidth * index, { duration: 1500 })
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <TabBarButton
                        key={route.name}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        isFocused={isFocused}
                        routerName={route.name}
                        color={isFocused ? "#fff" : colors.text}
                        label={label}
                    />
                );
            })}
        </View>
    );
}

const style = StyleSheet.create({
    tabBar: {
        position: 'absolute',
        bottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#ffff',
        marginHorizontal: 80,
        paddingVertical: 15,
        borderRadius: 38,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 10 },
        // shadowRadius: 10,
        // shadowOpacity: 0.1
    },
    tabBasrItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5
    }
})