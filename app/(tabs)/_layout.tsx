import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { Customtabs } from '@/components/Customtabs';

const _layout = () => {
  return ( 
    <Tabs tabBar={Customtabs} screenOptions={{headerShown: false}}>
        {/* <Tabs.Screen name="Dashboard" />
        <Tabs.Screen name="Diary" />
        <Tabs.Screen name="Statistics" />
        <Tabs.Screen name="Profile" /> */}
    </Tabs>
    )
};

export default _layout

const styles = StyleSheet.create({})