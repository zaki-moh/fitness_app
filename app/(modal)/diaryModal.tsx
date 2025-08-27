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


const DiaryModal = () => {
    const [meal, setMeal] = useState<MealType>({
        calories: 0,
        type: ""
    });
    const router = useRouter();
    const mealOptions = ["Breakfast", "Lunch", "Dinner", "Snack"];
    const {calorieCount, setCalorieCount, decrementCalorieCount, clearCalorieCount } = useMealStore();
    
    const [calorieInput, setCalorieInput] = useState("");
    const [mealType, setMealType] = useState("");
    //const [showDropdown, setShowDropdown] = useState(false);
    //const [loading, setLoading] = useState("");

    const onSubmit = async () => {
        if(mealType == "" && calorieInput == "") {
            Alert.alert("User", "Please fill all fields")
        }
        else if(calorieInput == "") {
            Alert.alert("User", "Please enter calorie amount");
        }
        else if(mealType == ""){
            Alert.alert("User", "Please select a meal type");
        }
        else {
            decrementCalorieCount(calorieInput);
            router.back();
        }

    }


    //const 

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
            <View style={styles.dropdowncontainer}>
                <Dropdown
                  style={{
                    width: 145,          
                    height: 30,
                    borderColor: "white",
                    borderWidth: 0,
                    borderRadius: 8,
                    paddingLeft: 10,
                    paddingRight: 5,
                }}
                placeholderStyle={{
                    fontSize: 18.5,        
                    color: colors.Secondary,
                    fontWeight: "700"
                }}
                selectedTextStyle={{
                    fontSize: 18,        
                    fontWeight: "700",
                    color: colors.Secondary
                }}

                data={mealOptions.map(m => ({ label: m, value: m }))}
                labelField="label"
                valueField="value"
                placeholder="Select meal"
                value={mealType}
                onChange={item => setMealType(item.value)}
                />
            </View>
            <Input
              placeholder="Enter calorie amount"
              value={calorieInput}       
              keyboardType="numeric"
              onChangeText={(text) => {
                setCalorieInput(text);
                setMeal({...meal, calories: Number(text) || 0})}
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
    //justifyContent: "space-between",
    paddingHorizontal: spacingY._7
 },
  avatarContainer: {
    marginTop: 60,
    alignItems: "center",
    gap: 8
    //position: "relative"
  },


    dropdowncontainer: {
    flex: 1,
    padding: 16,
    alignSelf: "flex-end",
    //marginBottom: 12
    bottom: 14
    },
})