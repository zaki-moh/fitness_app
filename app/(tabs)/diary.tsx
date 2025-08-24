import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import Typo from '@/components/Typo'

const Diary = () => {
  return (
    <ScreenWrapper style={{backgroundColor: "black"}}>
      <View style={styles.container}>
        <View  style={styles.calorieCount}>
          <Typo fontWeight={"bold"}>        
            2,800
          </Typo>
          <Typo fontWeight={"regular"} size={6.8}>
            remaining
          </Typo>
        </View>
    
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
    marginTop: 50,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    gap: 8
  }
})