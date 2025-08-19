import { StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect} from 'react';
import { colors } from '@/constants/theme';
import {useRouter} from "expo-router";

const Index = () => {
    // const router = useRouter();
    // useEffect (() => {
    //     setTimeout(() => {
    //         router.push("../welcome");
    //     }, 2000);
    // }, []);
  return (
    <View style = {styles.container}>
      <Image 
        style={styles.logo}
        resizeMode="contain"
        source={require("../assets/images/logo.png")}
      />
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.Background
    }, 
    logo: {
        height: '35%',
        aspectRatio: 1,
    },
});