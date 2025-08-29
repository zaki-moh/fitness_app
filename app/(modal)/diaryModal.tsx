import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import Header from '@/components/Header'
import BackButton from '@/components/BackButton'
import ModalWrapper from '@/components/ModalWrapper'
import Button from '@/components/Button'
import Typo from '@/components/Typo'
import { colors, spacingX, spacingY } from '@/constants/theme'
import { verticalScale } from '@/utils/styling'
import Input from '@/components/Input'
import { MealType } from '@/types'
import * as Icons from "phosphor-react-native"
import { Dropdown } from 'react-native-element-dropdown';
import { useRouter } from 'expo-router'
import { useMealStore } from "../../store/mealStore";
import { useSearchParams } from 'expo-router/build/hooks'



const DiaryModal = () => {

    type MealLog = {
    calories: number;
    section: "Breakfast" | "Lunch" | "Dinner" | "Snack";
    id: string;
    };

    const router = useRouter();
    const { decrementCalorieCount, addMeal } = useMealStore();

    const params = useSearchParams();
    const section = params.get("Section") as "Breakfast" | "Lunch" | "Dinner" | "Snack";

    const [calorieInput, setCalorieInput] = useState("");

    const onSubmit = async () => {
        if (calorieInput == "") {
            return Alert.alert("User", "Please enter calorie amount");
        }
        const calories = Number(calorieInput);
        if (isNaN(calories) || calories <= 0) {
            return Alert.alert("User", "Please enter a valid calorie amount");
}
        const newMealLog: MealLog = {
            calories: calories,
            section,
            id: Date.now().toString(),
        };
        addMeal(newMealLog);
        decrementCalorieCount(Number(calorieInput));
        router.back();
    }


  return (
    <ModalWrapper>
      <View style={styles.container}>
        <Header title="Quick Add" leftIcon={<BackButton iconSize={30}/>} rightIcon={
            <TouchableOpacity onPress={onSubmit}>
                <Icons.CheckIcon size={34} color={colors.Text}/>
            </TouchableOpacity>
        }
        style={{marginBottom: 8}}
        />
          <View style={styles.avatarContainer}>
            <Typo size={11} fontWeight={"bold"} style={{
              textAlign: "left",
              //marginTop: 1, 
              alignSelf: "flex-start",
              paddingHorizontal: 20,
              }}>
              Log Meal
            </Typo>
            <Input
              placeholder="Enter calorie amount"
              value={calorieInput}       
              keyboardType="numeric"
              onChangeText={(text) => {
                setCalorieInput(text);
            }
              }
            />
          </View>
      </View>
    </ModalWrapper>
  )
}

export default DiaryModal

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacingY._7
 },
  avatarContainer: {
    marginTop: 60,
    alignItems: "center",
    gap: 8
  },
})