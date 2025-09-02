import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { FoodLogProps } from '@/types'
import { colors, radius } from '@/constants/theme'
import { verticalScale } from '@/utils/styling'
import Typo from '@/components/Typo'
import * as Icons from "phosphor-react-native"

const screenWidth = Dimensions.get("window").width;

const Foodlog = ({ 
    style,   
    mealType,
    calorieAmount
}: FoodLogProps) => {


  return (
      <TouchableOpacity style={styles.container}>
        <Typo fontWeight={"500"} size={7.5} style={{paddingLeft: 370}}>{calorieAmount}</Typo>
      </TouchableOpacity>
  )
}

export default Foodlog

const styles = StyleSheet.create({
    container: {
        justifyContent: "flex-start",
        borderRadius: 25,
        borderCurve: "continuous",
        height: verticalScale(19),
        width: screenWidth,
        backgroundColor: colors.tabbar,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 8,
        paddingLeft: 15
    }
})