import { Href } from "expo-router";
import { Firestore, Timestamp } from "firebase/firestore";
import { Icon } from "phosphor-react-native";
import React, { ReactNode } from "react";
import {
  ActivityIndicator,
  ActivityIndicatorProps,
  ImageStyle,
  PressableProps,
  TextInput,
  TextInputProps,
  TextProps,
  TextStyle,
  TouchableOpacityProps,
  View,
  ViewStyle, // Corrected from Viewstyle
} from "react-native";

export type ScreenWrapperProps = {
  style?: ViewStyle;
  children?: React.ReactNode;
  backgroundColor?: string; 
};

export type TypoProps = {
  size?: number;
  color?: string;
  fontWeight?: TextStyle["fontWeight"];
  children?: any | null;
  style?: TextStyle;
  textProps?: TextProps;
};

export interface CustomButtonProps extends TouchableOpacityProps {
  style?: ViewStyle,
  onPress?: () => void;
  loading?: boolean,
  children?: React.ReactNode;
}

export type BackButtonProps = {
    style?: ViewStyle;
    iconSize?: number;
};

export interface InputProps extends TextInputProps {
  icon?: React.ReactNode,
  containerStyle?: ViewStyle,
  inputStyle?: TextStyle,
  inputRef?: React.RefObject<TextInput>
};

export type UserType = {
  uid?: string;
  email?: string | null;
  name: string | null;
  image?: any;
} | null;

export type AuthContextType = {
  user: UserType,
  setUser: Function,
  login: (
    email: string,
    password: string
  ) => Promise<{success: boolean, msg ?: string}>;
  register: (
    email: string,
    password: string,
    name: string
  ) => Promise<{success: boolean, msg ?: string}>;
  updateUserData: (userId: string) => Promise<void>;
};

export type HeaderProps = {
  title?: string,
  style?: ViewStyle,
  leftIcon?: ReactNode,
  rightIcon?: ReactNode
};

export type AccountOptionType = {
  title?: string,
  icon: React.ReactNode,
  bgColor: string,
  routeName?: any
};

export type ModalWrapperProps = {
  style?: ViewStyle,
  children: React.ReactNode,
  bgColor?: string
};

export type UserDataType = {
  name: string
};

export type ResponseType = {
  success: boolean;
  data?: any;
  msg?: string;
};

export type MealType = {
  calories: number | null;
  type: string;
};

export type CalorieType = {
  calories: number | null;
};

export type FoodLogProps = {
  meal: MealLog;  
  mealType: MealLog["section"];
  calorieAmount: number;
};

