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

    const renderMealIcon = (mealType: string) => {
    switch (mealType) {
        case "Breakfast":
            return <Icons.AppleLogoIcon color="#4CAF50" weight="fill" size={30} />;
        case "Lunch":
            return <Icons.PizzaIcon color="#E53935" weight="fill" size={30} />;
        case "Dinner":
            return <Icons.FishIcon color="#2196F3" weight="fill" size={30} />;
        default:
            return null;
  }
}

  return (
      <TouchableOpacity style={styles.container}>
        {renderMealIcon(mealType)}
        <Typo color={"white"} size={9} fontWeight={"bold"}>  {mealType}: </Typo>
        <Typo fontWeight={"bold"} size={9} style={{paddingLeft: 195}}>{calorieAmount}</Typo>
      </TouchableOpacity>
  )
}

export default Foodlog

const styles = StyleSheet.create({
    container: {
        justifyContent: "flex-start",
        borderRadius: radius._3,
        borderCurve: "continuous",
        height: verticalScale(22),
        width: screenWidth,
        backgroundColor: colors.tabbar,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 8,
        paddingLeft: 15
    }
})