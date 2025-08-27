import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router/stack';
import { AuthProvider } from '@/context/authContext';

const StackLayout = () => {
  return <Stack screenOptions={{headerShown: false}}>
    <Stack.Screen name={"(auth)/setDailyCalories"}
    />
    <Stack.Screen name="(modal)/profileModal" 
    options = {{presentation: "modal"}}
    />
    <Stack.Screen name="(modal)/diaryModal" 
    options = {{presentation: "modal"}}
    />
    <Stack.Screen name="(modal)/settingModal" 
    options = {{presentation: "modal"}}
    />
  </Stack>;
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <StackLayout  />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({});