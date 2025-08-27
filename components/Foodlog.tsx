import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { FoodLogProps } from '@/types'
import { colors, radius } from '@/constants/theme'
import { verticalScale } from '@/utils/styling'
import Typo from '@/components/Typo'
import * as Icons from "phosphor-react-native"



const Foodlog = ({    
    mealType,
    calorieAmount
}: FoodLogProps) => {

    const renderMealIcon = (mealType: string) => {
    switch (mealType) {
        case "Breakfast":
            return <Icons.AppleLogoIcon color="#4CAF50" weight="fill" size={20} />;
        case "Lunch":
            return <Icons.PizzaIcon color="#E53935" weight="fill" size={20} />;
        case "Dinner":
            return <Icons.FishIcon color="#2196F3" weight="fill" size={20} />;
        default:
            return null;
  }
}

  return (
      <TouchableOpacity style={styles.container}>
        {renderMealIcon(mealType)}
        <Typo color={"black"}>{calorieAmount}</Typo>
      </TouchableOpacity>
  )
}

export default Foodlog

const styles = StyleSheet.create({
    container: {
        justifyContent: "flex-start",
        borderRadius: radius._6,
        borderCurve: "continuous",
        height: verticalScale(32),
        width: verticalScale(150),
        backgroundColor: "white",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 8
    }
})