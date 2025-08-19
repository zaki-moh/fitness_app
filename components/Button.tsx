import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { CustomButtonProps } from '@/types';
import { colors, radius } from '@/constants/theme';
import { verticalScale } from '@/utils/styling';
import Loading from './Loading';

const Button = ({
    style,
    onPress,
    loading = false,
    children,
    color 
}: CustomButtonProps & { color?: string }) => {
    const buttonColor = color || colors.Secondary;

    if (loading) {
        return (
            <View style={[styles.button, style, { backgroundColor: 'transparent' }]}>
                <Loading />
            </View>
        );
    }

    return (
        <TouchableOpacity 
            onPress={onPress} 
            style={[styles.button, style, { backgroundColor: buttonColor }]}
        >
            {children}
        </TouchableOpacity>
    );
};

export default Button

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.Secondary,
        borderRadius: radius._6,
        borderCurve: "continuous",
        height: verticalScale(32),
        width: verticalScale(150),
        alignItems: "center",
        justifyContent: "center",
    },
});