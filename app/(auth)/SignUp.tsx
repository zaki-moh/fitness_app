import { Alert, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import Typo from '@/components/Typo'
import BackButton from '@/components/BackButton'
import { spacingX, spacingY, colors } from '@/constants/theme'
import Input from '@/components/Input'
import * as Icons from 'phosphor-react-native'
import { verticalScale } from '@/utils/styling'
import Button from '@/components/Button'
import { useRouter } from 'expo-router'
import { useAuth } from '@/context/authContext'



const SignUp = () => {
    const emailRef = useRef("");
    const passwordRef = useRef("");
    const nameRef = useRef("");
    const [isLoading, setIsLoading] = useState(false);
    const {register: registerUser} = useAuth();

    const handleSubmit = async () => {
        if(!emailRef.current || !passwordRef.current || !nameRef.current) {
            Alert.alert("Login", "please enter all fields");
            return
        }
        setIsLoading(true);
        const res = await registerUser (
        emailRef.current,
        passwordRef.current,
        nameRef.current,
        );
        setIsLoading(false);
        if(!res.success) {
          Alert.alert("Sign up", res.msg);
        }
        else {
            router.push("/(auth)/setDailyCalories");
        }
    };
    const router = useRouter();


  return (
    <ScreenWrapper> 
        <View>  
            <BackButton iconSize={30}/>
        </View>
        <View style={{gap: 5, marginTop: spacingX._40, left: 30}}>
            <Typo size={15} fontWeight={"800"}>
                Lets,
            </Typo>
            <Typo size={15} fontWeight={"800"}>
                Get Started!
            </Typo>

        </View>
        <View style={styles.form}>
            <View style={{left: 35, marginTop: spacingY._20}}> 
                <Typo size={6} fontWeight={"light"} color={colors.subText}>Create an account now to manage your nutrition</Typo>
            </View>
            <View style={styles.input}>
                <Input
                placeholder="Enter your name"
                onChangeText={(value) => (nameRef.current = value)}
                icon={<Icons.User 
                        size={verticalScale(12)} 
                        color={colors.subText} 
                        weight="fill"
                        style={{marginLeft:18}}
                />}
                />
            </View>
            <View style={styles.input}>
                <Input
                placeholder="Enter your email"
                onChangeText={(value) => (emailRef.current = value)}
                icon={<Icons.At 
                        size={verticalScale(12)} 
                        color={colors.subText} 
                        weight="fill"
                        style={{marginLeft:18}}
                />}
                />
            </View>
            <View style={styles.input}>
                <Input
                placeholder="Enter your password"
                secureTextEntry
                onChangeText={(value) => (passwordRef.current = value)}
                icon={<Icons.Lock 
                        size={verticalScale(12)} 
                        color={colors.subText} 
                        weight="fill"
                        style={{marginLeft:18}}
                />}
                />
            </View>

            {/* button */}
            <View style={styles.input}>
                <Button loading={isLoading} onPress={handleSubmit} style={{height: verticalScale(28), width: 380}}> 
                    <Typo size={10} fontWeight={"bold"} color={colors.primary}> 
                        Sign Up
                    </Typo>
            </Button>
            <View style={{paddingTop:20, flexDirection: 'row'}}>
                <Typo size={6}>Already have an account?</Typo>
                <Pressable onPress={() => router.push("/(auth)/SignIn")}> 
                   <Typo size={6} color={colors.Secondary}> Login </Typo>
                </Pressable>
            </View>
            </View>

        </View>
    </ScreenWrapper>
  )
}

export default SignUp

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: spacingY._30,
        paddingHorizontal: spacingX._20
    },
    form: {
        gap: spacingX._20
    },
    input: {
        alignItems: 'center'
    }
})


