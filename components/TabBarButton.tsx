import { icon } from '@/constants/icons';
import { useTheme } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

interface IProps {
    onPress: () => void,
    onLongPress: () => void,
    isFocused: boolean,
    routerName: string,
    color: string,
    label: string
}

const TabBarButton: React.FC<IProps> = ({ color, isFocused, label, onLongPress, onPress, routerName }) => {
    const { colors } = useTheme();
    const scale = useSharedValue(0);

    useEffect(() => {
        scale.value = withSpring(
            typeof isFocused === 'boolean' ? (isFocused ? 1 : 0) : isFocused,
            { duration: 350 }
        );
    }, [scale, isFocused]);

    const animatedIconStyle = useAnimatedStyle(() => {
        const scaleValue = interpolate(scale.value, [0, 1], [1, 1.5]);

        const top = interpolate(scale.value, [0, 1], [0, 12]);

        return {
            transform: [{
                scale: scaleValue
            }],
            top
        }
    })

    const animatedTextStyle = useAnimatedStyle(() => {
        const opacity = interpolate(scale.value, [0, 1], [1, 0]);

        return { opacity }
    });

    return (
        <Pressable
            onPress={onPress}
            onLongPress={onLongPress}
            style={style.tabBasrItem}
        >
            <Animated.View style={[{}, animatedIconStyle]}>
                {routerName !== 'settings' && routerName !== 'comments' && icon[routerName as 'index' | 'post' | 'search']({
                    color: isFocused ? "#fff" : colors.text
                })}
            </Animated.View>

            <Animated.Text style={[
                { color: isFocused ? colors.primary : colors.text, fontSize: 12 }, 
                animatedTextStyle]}
            >
                {label}
            </Animated.Text>
        </Pressable>
    )
}

const style = StyleSheet.create({
    tabBasrItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5
    }
})

export default TabBarButton;