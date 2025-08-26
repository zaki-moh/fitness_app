import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import Typo from '@/components/Typo'
import Input from '@/components/Input'
import * as Icons from "phosphor-react-native"
import { useRoute } from '@react-navigation/native'
import { useRouter } from 'expo-router'
import { useMealStore } from "../../store/mealStore";
import { CalorieType } from '@/types'



const SetDailyCalories = () => {

    const [calorieAmount, setCalorieAmount] = useState("");
    const {calorieCount, setCalorieCount, decrementCalorieCount, clearCalorieCount } = useMealStore();
    const router = useRouter();

    const onPress = () => {
        if(calorieAmount == "") {
            Alert.alert("User", "Please enter an amount");
        }
        else {
            setCalorieCount(calorieAmount);
            router.push("../(tabs)/Dashboard");
        }
    }

  return (
    <ScreenWrapper>
      <View> 
        <TouchableOpacity onPress={onPress}>
            <Icons.CheckIcon style={styles.button} color="white" size={35}/>
        </TouchableOpacity>
      </View>
      <Typo size={12} style={styles.header} fontWeight={"bold"}>What is calorie goal?</Typo>
      <View style={styles.input}>
        <Input 
            placeholder='Enter calorie amount'
            value={calorieAmount}
            keyboardType="numeric"
            onChangeText={(amount) => {
                setCalorieAmount(amount)
            }}
        />
      </View> 
    </ScreenWrapper>
  )
}

export default SetDailyCalories

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-around"
    },
    header: {
        marginTop: 45,
        alignSelf: "flex-start",
        marginLeft: 40
    },
    input: {
        marginTop: 20,
        alignSelf: "center"
    },
    button: {
        alignSelf: "flex-end",
        marginTop: 10,
        marginRight: 25
    }
})