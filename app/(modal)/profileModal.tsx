import { StyleSheet, Text, View, Image, Alert } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import ModalWrapper from '@/components/ModalWrapper'
import { colors, spacingX, spacingY } from '@/constants/theme'
import Header from '@/components/Header'
import BackButton from '@/components/BackButton'
import { ScrollView } from 'react-native-reanimated'
import { verticalScale } from '@/utils/styling'
import Typo from '@/components/Typo'
import Input from '@/components/Input'
import { UserDataType } from '@/types'
import Button from '@/components/Button'
import { useAuth } from '@/context/authContext'
import { useRoute } from '@react-navigation/native'
import { useRouter } from 'expo-router'
import { updateUser } from '@/services/userService'

const ProfileModal = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<UserDataType>({
      name: ""
    });

  const { user, updateUserData} = useAuth();
  
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setUserData({
      name: user?.name || ""
    });
  }, [user]);

  const onSubmit = async () => {
    let {name} = userData;
    if(!name.trim()) {
      Alert.alert("User", "Please fill all fields");
      return;
    }

    setLoading(true);
    const res = await updateUser(user?.uid as string, userData);

    if(res.success) {
      updateUserData(user?.uid as string);
      router.back();
    }
    else {
      Alert.alert("User", res.msg);
    }
  }
  return (
    <ModalWrapper>
      <View style={styles.container}>
        <Header title="Update Profile" leftIcon={<BackButton iconSize={30}/>} style={{marginBottom: 2}}/>
          <View style={styles.avatarContainer}>
            <Image
              style={styles.image}
              source={require("../../assets/images/user.png")}
              resizeMode='contain'
            />
            <Typo size={7.5} fontWeight={"bold"} style={{
              textAlign: "left",
              //marginTop: 1, 
              alignSelf: "flex-start",
              paddingHorizontal: 20

              }}>
              Name
            </Typo>
            <Input
              placeholder="Enter your name"
              value={userData.name}
              onChangeText={(value) => setUserData({...userData, name: value})}
            />
            <View style={styles.footer}>
              <Button loading={loading} style={{width: verticalScale(155), height: verticalScale(27)}} onPress={onSubmit}>
                <Typo color='black' size={8} fontWeight={"bold"}> 
                  Submit
                </Typo>
              </Button>
            </View>
          </View>
      </View>
    </ModalWrapper>
  )
}

export default ProfileModal

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: "space-between",
    paddingHorizontal: spacingY._7
 },
  avatarContainer: {
    marginTop: 28,
    alignItems: "center",
    gap: 12 
    //position: "relative"
  },
  image: {
    height: verticalScale(75),
    width: verticalScale(75),
    marginTop: -15
  },
  footer: {
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    paddingHorizontal: spacingX._20,
    gap: verticalScale(12),
    paddingTop: 330,
    borderTopColor: colors.Background,
    //marginBottom: spacingY._,
    borderTopWidth: 1,
  },
})