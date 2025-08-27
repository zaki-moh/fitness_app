import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import ModalWrapper from '@/components/ModalWrapper'
import { useRouter } from 'expo-router';
import { useMealStore } from '@/store/mealStore';
import * as Icons from 'phosphor-react-native'
import Typo from '@/components/Typo';
import Input from '@/components/Input';
import BackButton from '@/components/BackButton';
import Header from '@/components/Header';
import { colors } from '@/constants/theme';


const setDailyCalories = () => {
    const [calorieAmount, setCalorieAmount] = useState("");
    const {calorieCount, setCalorieCount, decrementCalorieCount, clearCalorieCount } = useMealStore();
    const router = useRouter();

    const onPress = () => {
        if(calorieAmount == "") {
            Alert.alert("User", "Please enter an amount");
        }
        else {
            setCalorieCount(calorieAmount);
            router.push("/(tabs)/Dashboard");
        }
    }
  return (
    <ModalWrapper>
      <View style={{paddingHorizontal: 10, paddingBottom: 8, paddingTop: 25}}> 
        <Header title= "" leftIcon={<BackButton iconSize={34}/>} rightIcon={
            <TouchableOpacity onPress={onPress}>
                <Icons.CheckIcon size={34} color={colors.Text}/>
            </TouchableOpacity>
        }
        />
      </View>
      <Typo size={12} style={styles.header} fontWeight={"bold"}>What is Your Calorie Goal?</Typo>
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
    </ModalWrapper>
  )
}

export default setDailyCalories

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: "space-around"
    },
    header: {
        marginTop: 45,
        alignSelf: "center",
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
