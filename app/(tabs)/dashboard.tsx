import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '@/constants/theme'
import { auth } from '@/config/firebase'
import Typo from '@/components/Typo'
import Button from '@/components/Button'
import { signOut } from 'firebase/auth'
import { useAuth } from '@/context/authContext'
import ScreenWrapper from '@/components/ScreenWrapper'

const dashboard = () => {
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
      </Typo>
    </ScreenWrapper>
  );
};

export default dashboard

const styles = StyleSheet.create({})