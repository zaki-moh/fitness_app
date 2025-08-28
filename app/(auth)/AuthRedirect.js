import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/authContext';

export default function AuthRedirect() {
  const router = useRouter();
  const { user, dailyCalories } = useAuth();

  useEffect(() => {
    if (!user) {
      router.replace('(auth)/SignIn'); // not signed in
    } else if (!dailyCalories) {
      router.replace('(auth)/setDailyCalories'); // need to set calories
    } else {
      router.replace('(tabs)/Dashboard'); // fully onboarded
    }
  }, [user, dailyCalories]);

  return null; // nothing to render
}
