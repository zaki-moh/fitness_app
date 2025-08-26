import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import Typo from '@/components/Typo'
import { colors } from '@/constants/theme'
import * as Icons from "phosphor-react-native";
import { useRouter } from 'expo-router'
import { useMealStore } from "../../store/mealStore";



const Diary = () => {
  const router = useRouter();
  const {calorieCount, setCalorieCount, decrementCaloriCount, clearCalorieCount } = useMealStore();


  return (
    <ScreenWrapper style={{backgroundColor: colors.primary}}>
      <View style={styles.container}>
        <View  style={styles.calorieCount}>
          <Typo fontWeight={"500"} size={25}>        
           {calorieCount.toLocaleString('en-US')}
          </Typo>
          <Typo fontWeight={"400"} size={6.8} color={"#A9B2BC"}>
            calories remaining
          </Typo>
        </View>
        <View style={styles.diary}>
          <Typo size={10} fontWeight={"700"} style={{alignSelf: "flex-start", marginLeft: 25, marginTop: 30}}>
            food
          </Typo>
          <TouchableOpacity style={styles.plusButton} onPress={() => {
            router.push("/(modal)/diaryModal");
          }}> 
            <Icons.PlusCircleIcon
            weight='fill'
            color={colors.Secondary}
            size={40}
            />
          </TouchableOpacity>
        </View>
    
      </View>
    </ScreenWrapper>
  )
}

export default Diary

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between"
  },
  calorieCount: {
    marginTop: 55,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    gap: -2
  },
  diary: {
    flex: 1,
    marginTop: 55,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: colors.darkGrey,
  },
  plusButton: {
    alignSelf: "flex-end",
    marginRight: 15,
    marginTop: -35
  }
})