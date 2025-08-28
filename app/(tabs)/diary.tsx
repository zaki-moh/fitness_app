import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import Typo from '@/components/Typo'
import { colors } from '@/constants/theme'
import * as Icons from "phosphor-react-native";
import { useRouter } from 'expo-router'
import { useMealStore } from "../../store/mealStore";
import Foodlog from '@/components/Foodlog'

const Diary = () => {
  const router = useRouter();
  const { calorieCount } = useMealStore();
  
  const meals = ["Breakfast", "Lunch", "Dinner", "Snack"];

  return (
    <ScreenWrapper style={{ backgroundColor: colors.primary }}>
      <View style={styles.container}>
        <View style={styles.calorieCount}>
          <Typo fontWeight={"500"} size={25}>        
            {calorieCount}
          </Typo>
          <Typo fontWeight={"400"} size={6.8} color={"#A9B2BC"}>
            calories remaining
          </Typo>
        </View>

        
        <ScrollView style={styles.diary} contentContainerStyle={{ paddingBottom: 20 }}>
          {meals.map((meal) => (
            <View key={meal} style={styles.section}>
              
              {/* Section Header */}
              <View style={styles.sectionHeader}>
                <Typo size={8} fontWeight={"700"}>{meal}</Typo>
                <TouchableOpacity onPress={() => router.push("/(modal)/diaryModal")}>
                  <Icons.PlusCircle weight="fill" color={colors.Secondary} size={28} />
                </TouchableOpacity>
              </View>

              {/* Placeholder for food log */}
              <Foodlog meal={meal} />

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
    marginTop: 30,
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
    marginTop: 35,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: "#333",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15
  }
})
