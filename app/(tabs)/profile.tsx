import Header from '@/components/Header'
import ScreenWrapper from '@/components/ScreenWrapper'
import Typo from '@/components/Typo'
import { colors, spacingX, spacingY } from '@/constants/theme'
import { useAuth } from '@/context/authContext'
import { verticalScale } from '@/utils/styling'
import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

const Profile = () => {
  const { user } = useAuth();
  
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Header title="Profile"/>
        <View style={styles.userInfo}>
          {/*avatar*/}
          <View>
            <Image source={user?.image} style={styles.avatar} resizeMode="contain" transition={10}/>
          </View>
          <View style={styles.nameContainer}>
            <Typo size={8} fontWeight={"600"}>
              {user?.name}
            </Typo>
            <Typo size={6} fontWeight={"600"} color={"grey"}>
              {user?.email}
            </Typo>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacingX._20
  },
  userInfo: {
    marginTop: verticalScale(30),
    alignItems: "center",
    gap: spacingX._15,
  },
  nameContainer: {
    gap: verticalScale(4),
    alignItems: "center",
  },
  avatar: {
    alignItems: "center",
    height: verticalScale(20),
    width: verticalScale(20),
    borderRadius: 200,
  },
})