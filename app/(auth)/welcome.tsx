import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import Typo from "@/components/Typo"
import { colors, spacingX, spacingY } from '@/constants/theme'
import { verticalScale } from '@/utils/styling'
import Button from '@/components/Button'
import { useRouter } from 'expo-router'

const Welcome = () => {
  const router = useRouter();
  return (
    <ScreenWrapper backgroundColor='#131217'>
      <View style={styles.container}> 
        <Image 
          style={styles.welcomeImage}
          resizeMode='contain'
          source={require("../../assets/images/welcome.png")}
        />
        <View style={styles.buttonGroup}> 
          <Button onPress={()=>router.push('/(auth)/SignUp')} style={styles.button}> 
            <Typo size={13} color={colors.primary} fontWeight={"bold"}>Sign up</Typo>
          </Button>
          <Button onPress={()=>router.push('/(auth)/SignIn')} style={styles.button} color='#131217'> 
            <Typo size={13} color={colors.Secondary} fontWeight={"bold"}>Log in</Typo>
          </Button>
        </View>

      </View>
    </ScreenWrapper>
  )
}

export default Welcome

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacingY._7
  },
  welcomeImage: {
    width: '150%',
    height: verticalScale(200),
    alignSelf: 'center',
    paddingTop: 30
  },
  buttonGroup: {
    width: '100%',
    paddingHorizontal: spacingX._25,
    gap: verticalScale(4), 
    paddingBottom:verticalScale(40)
    //marginBottom: verticalScale(40) 
  },
  button: {
    alignSelf: 'center',
    width: 375
  }
})
