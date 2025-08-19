import { StyleSheet, Text, TextStyle, View } from 'react-native'
import React from 'react'
import { colors } from '@/constants/theme'
import { TypoProps } from '@/types'
import { verticalScale } from '@/utils/styling'

const type = ({
    size, 
    color = colors.Text,
    fontWeight = "400",  
    children, style, 
    textProps = {}
}: TypoProps) => {

  const textStyle: TextStyle = {
      fontSize: size? verticalScale(size) : verticalScale (18),
      color,
      fontWeight,
  };
  return ( 
    <Text style={[textStyle, style]} {...textProps}>{children}</Text>
  );
};

export default type

const styles = StyleSheet.create({})