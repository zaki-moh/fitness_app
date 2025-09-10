import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import ModalWrapper from '@/components/ModalWrapper'
import Typo from '@/components/Typo'
import { verticalScale } from '@/utils/styling'
import { colors } from '@/constants/theme'
import Checkbox from 'expo-checkbox';
import { useRouter } from 'expo-router'
import Button from '@/components/Button'




const PrivacyPolicy = () => {
  
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Typo size={18} fontWeight="700" style={styles.title}>
        Privacy Policy
      </Typo>
      <Typo size={4} color="gray" style={styles.effectiveDate}>
        Effective Date: September 1, 2024
      </Typo>

      <View style={styles.section}>
        <Typo size={11} fontWeight="400" style={styles.sectionTitle}>
          Introduction
        </Typo>
        <Typo size={4} style={styles.sectionText}>
          This is a personal project app and is not publicly distributed. 
        </Typo>
      </View>

      <View style={styles.section}>
        <Typo size={11} fontWeight="400" style={styles.sectionTitle}>
          Information Collection
        </Typo>
        <Typo size={4} style={styles.sectionText}>
          The app may collect basic information entered by users, such as calorie logs or meal entries.
        </Typo>
        <Typo size={4} style={styles.sectionText}>
          No personally identifiable information (like name, email, or phone number) is required.
        </Typo>
      </View>

      <View style={styles.section}>
        <Typo size={11} fontWeight="400" style={styles.sectionTitle}>
          Use of Information
        </Typo>
        <Typo size={4} style={styles.sectionText}>
          Information entered is used solely to display and track personal data within the app.
        </Typo>
        <Typo size={4} style={styles.sectionText}>
          Data is not shared with any third parties.
        </Typo>
      </View>

      <View style={styles.section}>
        <Typo size={11} fontWeight="400" style={styles.sectionTitle}>
          Data Storage
        </Typo>
        <Typo size={4} style={styles.sectionText}>
          All data is stored locally on the device.
        </Typo>
        <Typo size={4} style={styles.sectionText}>
          No cloud storage or external servers are used.
        </Typo>
      </View>

      <View style={styles.section}>
        <Typo size={11} fontWeight="400" style={styles.sectionTitle}>
          Third-Party Services
        </Typo>
        <Typo size={4} style={styles.sectionText}>
          This app may use libraries or components (like react-native-circular-progress) for functionality and UI.
        </Typo>
        <Typo size={4} style={styles.sectionText}>
          These libraries do not collect personal data.
        </Typo>
      </View>

      <View style={styles.section}>
        <Typo size={11} fontWeight="400" style={styles.sectionTitle}>
          Children’s Privacy
        </Typo>
        <Typo size={4} style={styles.sectionText}>
          This app is not intended for children under 11.
        </Typo>
      </View>

      <View style={styles.section}>
        <Typo size={11} fontWeight="400" style={styles.sectionTitle}>
          Policy Updates
        </Typo>
        <Typo size={4} style={styles.sectionText}>
          As a personal project, this privacy policy may be updated occasionally to reflect changes in app functionality.
        </Typo>
      </View>

      <View style={styles.section}>
        <Typo size={11} fontWeight="400" style={styles.sectionTitle}>
          Contact
        </Typo>
        <Typo size={4} style={styles.sectionText}>
          This is a personal project, so there is no support or contact for privacy questions.
        </Typo>
      </View>

      <View style={{alignSelf: "flex-start", marginLeft: 20, paddingBottom: 28, justifyContent: 'space-between', flexDirection: 'row', alignItems:  "center", gap: 15}}>
        <Checkbox
        value={isChecked}
        onValueChange={setIsChecked}
        />
        <Typo size={8}>I agree to the Privacy Policy</Typo>
      </View>
      <View style={{paddingBottom: 40}}>
        <Button loading={isLoading} onPress={()=> router.back()} style={{height: 45, width: 360, borderRadius: 8, alignSelf: "center", backgroundColor: colors.darkGrey}}>
          <Typo size={8}>
            Continue
          </Typo>
        </Button>
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.Background,
  },
  content: {
    padding: 20,
  },
  title: {
    marginBottom: 4,
    marginTop: 14,
    textAlign: 'center',
  },
  effectiveDate: {
    marginBottom: 40,
    marginTop: 4,
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    marginBottom: 4,
    fontWeight: "500"
  },
  sectionText: {
    lineHeight: 18,
    marginBottom: 8,
  },
});

export default PrivacyPolicy;