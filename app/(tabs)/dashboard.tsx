import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '@/constants/theme'
import { auth } from '@/config/firebase'
import Typo from '@/components/Typo'
import Button from '@/components/Button'
import { signOut } from 'firebase/auth'
import { useAuth } from '@/context/authContext'
import ScreenWrapper from '@/components/ScreenWrapper'
import Foodlog from '@/components/Foodlog'

const Dashboard = () => {
    const {user} = useAuth();
    
    const handleLogout = async () => {
        await signOut(auth);
    }
  return (
    <ScreenWrapper>
      <Typo>Home
        <Button onPress={handleLogout}>
            <Typo color={colors.primary}>
                Logout
            </Typo> 
        </Button>
        <View style={{paddingTop: 50}}>
          <Foodlog calorieAmount={200} mealType='BreakFast'/>
        </View>
      </Typo>
    </ScreenWrapper>
  );
};

export default Dashboard

const styles = StyleSheet.create({})