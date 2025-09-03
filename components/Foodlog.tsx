import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { FoodLogProps } from '@/types'
import { colors, radius } from '@/constants/theme'
import { verticalScale } from '@/utils/styling'
import Typo from '@/components/Typo'
import * as Icons from "phosphor-react-native"
import { SwipeListView } from "react-native-swipe-list-view";
import { PanGestureHandler, PanGestureHandlerGestureEvent, Pressable } from "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'


const screenWidth = Dimensions.get("window").width;

const Foodlog = ({ 
    style,   
    mealType,
    calorieAmount
}: FoodLogProps) => {

    const translateX = useSharedValue(0)
    const itemHeight = useSharedValue(verticalScale(19))
    const TRANSLATE_X_THRESHHOLD = -screenWidth *.30
    //const marginVertical = useSharedValue(3)
  
  const handleGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent> ({
    onActive: (event) => {
      translateX.value = event.translationX * .6;
    },
    onEnd: (event) => {
      const shouldBeDismissed = translateX.value < TRANSLATE_X_THRESHHOLD
      if(shouldBeDismissed) {
        translateX.value = withTiming(-screenWidth, { duration: 300 })
        itemHeight.value = withTiming(0)
        //marginVertical.value = withTiming(0)
      }
      else {
        translateX.value = withTiming(0);
      }
    } 
  })

  const rIconContainerStyle = useAnimatedStyle(() => {
    return {
      opacity: translateX.value < TRANSLATE_X_THRESHHOLD ? 0 : 1,
    };
  });

  const rTaskContainerStyle = useAnimatedStyle(() => {
    return {
      height: itemHeight.value,
      opacity: 1 + translateX.value / screenWidth, 
      transform: [{ translateX: translateX.value }],
      //marginVertical: marginVertical.value
    };
  });

  const animatedStyle = useAnimatedStyle(() => ({
      transform: [{
        translateX: translateX.value
      }]
  }))

  return (
      <GestureHandlerRootView style={{flex: 1}}>
        <Animated.View style={[styles.icon, rIconContainerStyle]}>
          <Icons.TrashIcon  color={colors.Accent} size={verticalScale(19) *.6}/>
        </Animated.View>
        <PanGestureHandler onGestureEvent={handleGesture}>
          <Animated.View style={[{paddingBottom: 3}, rTaskContainerStyle]}>
            <Pressable style={styles.container}>
              <Typo fontWeight={"500"} size={7.5} style={{paddingLeft: 370}}>{calorieAmount}</Typo>
            </Pressable>
          </Animated.View>
        </PanGestureHandler>
      </GestureHandlerRootView>
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
    },
    icon: {
      height: verticalScale(19),
      width: verticalScale(19),
      position: "absolute",
      right: "10%",
      backgroundColor: colors.darkGrey,
      justifyContent: "center",
      alignItems: "center"
    }
})