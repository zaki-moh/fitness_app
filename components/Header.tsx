import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { HeaderProps } from '@/types'
import Typo from './Typo'

const Header = ({title = "", leftIcon, rightIcon, style}: HeaderProps) => {
  return (
    <View style={styles.container}>
    {/* Left icon */}
    <View style={styles.side}>
        {leftIcon && leftIcon}
    </View>

    {/* Title */}
    <View style={styles.titleContainer}>
        {title && <Typo size={9} fontWeight="600">{title}</Typo>}
    </View>

    {/* Right icon */}
    <View style={styles.side}>
        {rightIcon && rightIcon}
    </View>
    </View>
  );
};

export default Header

const styles = StyleSheet.create({
    container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    },
    side: {
    width: 40, // reserve space for icons, even if empty
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12
    },
    titleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
    }
})