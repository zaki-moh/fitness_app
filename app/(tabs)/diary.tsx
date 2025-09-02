import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native'
import React, { JSX, useState } from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import Typo from '@/components/Typo'
import { colors } from '@/constants/theme'
import * as Icons from "phosphor-react-native";
import { useRouter } from 'expo-router'
import { useMealStore } from "../../store/mealStore";
import Foodlog from '@/components/Foodlog'
import { AnimatedCircularProgress } from 'react-native-circular-progress';
const Diary = () => {
  const router = useRouter();
  const { calorieCount, mealLogs } = useMealStore();
  
  const meals = ["Breakfast", "Lunch", "Dinner", "Snack"];

  const mealIcons: Record<string, JSX.Element> = {
  Breakfast: <Icons.Coffee weight="fill" color="#FF9800" size={32} />,
  Lunch: <Icons.BowlFood weight="fill" color="#4CAF50" size={32} />,
  Dinner: <Icons.ForkKnife weight="fill" color="#2196F3" size={32} />,
  Snack: <Icons.AppleLogo weight="fill" color="#FF1A1A" size={32} />,
  };


  const goalPercent = () => {
    let total = 0;
    for (let i = 0; i < mealLogs.length; i++) {
      total += mealLogs[i].calories
    }
    return total/calorieCount
  };

  return (
    <ScreenWrapper style={{ backgroundColor: colors.primary }}>
      <View style={styles.container}>
        <View style={styles.calorieCount}>
        <AnimatedCircularProgress
          size={220}
          width={12}
          fill={goalPercent()}
          tintColor= {colors.Secondary}
          backgroundColor="#333"
          lineCap="round"
        >
          {() =>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Typo fontWeight={"500"} size={23}>
              {calorieCount}
            </Typo>
            <Typo fontWeight={"400"} size={5.8} color={"#A9B2BC"}>
              calories remaining
            </Typo>
          </View>}
        </AnimatedCircularProgress>
        </View>

        
        <ScrollView style={styles.diary} >
          {meals.map((meal) => (
            <View key={meal} style={styles.section}>
              
              {/* Section Header */}
              <View style={styles.sectionHeader}>
                <View style={styles.iconAndText}>
                  {mealIcons[meal]}
                  <Typo size={9.5} fontWeight={"700"} style={{ marginLeft: 8 }}>
                    {meal}
                  </Typo>
                </View>
                <View style={{alignSelf: 'flex-end'}}>
                  <TouchableOpacity style={{alignSelf: "flex-end"}} onPress={() => router.push({pathname: "/(modal)/diaryModal", params: { Section: meal }})}>
                    <Icons.PlusCircle weight="fill" color={colors.Secondary} size={37} />
                  </TouchableOpacity>
                </View>
              </View>
              {mealLogs.filter((log) => log.section == meal).map((log, index) => (
                <View key={log.id ?? index} style={{paddingBottom: 3}}>
                  <Foodlog mealType={meal} calorieAmount={log.calories}/>
                </View>
              ))}
            </View>
          ))}
        </ScrollView>
        
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
    marginTop: 35,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 2
  },
  diary: {
    flex: 1,
    marginTop: 40,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: colors.darkGrey,
  },
  section: {
    marginTop: 30,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: "#333",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    bottom: 10
  },
  iconAndText: {
    flexDirection: "row", 
    alignItems: "center", 
  },
})
