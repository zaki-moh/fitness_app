import Header from '@/components/Header'
import ScreenWrapper from '@/components/ScreenWrapper'
import Typo from '@/components/Typo'
import { colors, spacingX, spacingY, radius } from '@/constants/theme'
import { useAuth } from '@/context/authContext'
import { AccountOptionType } from '@/types'
import { verticalScale } from '@/utils/styling'
import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import * as Icons from "phosphor-react-native";
import { Route } from 'expo-router/build/Route'
import { signOut } from 'firebase/auth'
import { auth } from '@/config/firebase'
import { useRouter } from 'expo-router'

const Profile = () => {
  const { user } = useAuth();
  const router = useRouter();
  
  const accountOptions: AccountOptionType[] = [
      {
        title: "Edit profile",
        icon: (
          <Icons.User
            size={30}
            color={"white"}
            weight="fill"
          />
        ),
        bgColor: colors.Secondary,
        routeName: "(modal)/profileModal"
      },
      {
        title: "Settings",
        icon: (
          <Icons.GearIcon
            size={30}
            color={"white"}
            weight="fill"
          />
        ),
        bgColor: "#4CAF50",
        routeName: "(modal)/settingModal"
      },
      {
        title: "Privacy policy",
        icon: (
          <Icons.LockIcon
            size={30}
            color={"white"}
            weight="fill"
          />
        ),
        bgColor: "rgba(85, 85, 85, 1)",
        routeName: "(modal)/profileModal"
      },
      {
        title: "Logout",
        icon: (
          <Icons.PowerIcon
            size={30}
            color={"white"}
            weight="fill"
          />
        ),
        bgColor: "#E53935",
        routeName: "(modal)/profileModal"
      },
  ]

  const handleLogout = async () => {
      await signOut(auth);
  }

  const showLogoutAlert = () => {
      Alert.alert("Confirm", "Are you sure you want to logout?", [
        {
          text: "Cancel",
          onPress: () => console.log("cancele logout"),
          style: "cancel"
        },
        {
          text: "Logout",
          onPress: () => handleLogout(),
          style:  "destructive"
        }
      ]);
  }

  const handlePress = (item: AccountOptionType) => {
    if(item.title == "Logout") {
      showLogoutAlert();
    }

    if(item.routeName) {
      router.push(item.routeName);
    }
  }

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Header title="Profile"/>
        <View style={styles.userInfo}>
          {/*avatar*/}
          <View>
            <Image source={require("../../assets/images/user.png")} style={styles.avatar} resizeMode="contain"/>
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
        <View style={styles.accountOptions}>
          {accountOptions.map((item, index) => {
            return (            
            // eslint-disable-next-line react/jsx-key
            <Animated.View
              key={index.toString()}
              entering={
              FadeInDown.delay(index*50).springify().damping(14)}
              style={styles.listItem}
            >
              <TouchableOpacity style={styles.flexRow} onPress={()=> handlePress(item)}>
                <View 
                  style={[
                    styles.listIcon,
                    {
                      backgroundColor: item?.bgColor,
                    }
                    ]}
                >
                    {item.icon && item.icon}
                </View>
                <Typo size={6.8} fontWeight={"600"} style={{flex: 1}}>
                  {item.title}
                </Typo>
                <Icons.CaretRightIcon
                  size={26}
                  weight="bold"
                  color={"white"}
                  />
              </TouchableOpacity>
            </Animated.View>
            );
          })}
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
    marginTop: verticalScale(10),
    alignItems: "center",
    gap: spacingX._5,
  },
  nameContainer: {
    gap: verticalScale(4),
    alignItems: "center",
  },
  avatar: {
    alignItems: "center",
    height: verticalScale(65),
    width: verticalScale(65),
    borderRadius: 200,
  },
  accountOptions: {
    marginTop: spacingY._20,
  },
  listItem: {
    marginBottom: verticalScale(12),
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacingX._10
  },
  listIcon: {
    height: verticalScale(20),
    width: verticalScale(20),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    borderCurve: "continuous",

  },
})