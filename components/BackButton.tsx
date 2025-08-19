import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router';
import { BackButtonProps } from '@/types';
import { CaretLeftIcon } from 'phosphor-react-native';
import { colors } from '@/constants/theme';

const BackButton = ({
    style,
    iconSize
}: BackButtonProps) => {
    const router = useRouter();
  return (
        <TouchableOpacity onPress={() => router.back()} style={[styles.button, style]}> 
            <CaretLeftIcon size={iconSize} color={colors.Text} weight='bold'/>
        </TouchableOpacity>
  )
}

export default BackButton

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'transparent',
        alignSelf: 'flex-start',
        left: 10,
        padding: 5,
    },
})