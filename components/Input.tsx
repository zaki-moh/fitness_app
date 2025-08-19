import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { InputProps } from '@/types'
import { colors, radius } from '@/constants/theme'
import { verticalScale } from '@/utils/styling'

const Input = (props: InputProps) => {
  return (
    <View style={[styles.container, props.containerStyle && props.containerStyle]}
    >
        {
            props.icon && props.icon
        }
      <TextInput 
        style={[styles.textInput, props.inputStyle]} 
        placeholder={colors.subText}
        ref={props.inputRef && props.inputRef}
        {...props}
      />
    </View>
  )
}

export default Input

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: verticalScale(26),
        width: 380,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: colors.subText,
        borderRadius: radius._6,
        borderCurve: 'continuous'
    },
    textInput: {
        flex: 1,
        color: colors.subText,
        fontSize: verticalScale(7),
        paddingLeft: 12
    }
})