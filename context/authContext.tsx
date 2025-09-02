import { auth, fireStore } from "@/config/firebase";
import { AuthContextType, UserType } from "@/types";
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserType>(null);
  const [dailyCalories, setDailyCalories] = useState<number | null>(null);
  const router = useRouter();

useEffect(() => {
  const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
    if (firebaseUser) {
      setUser({
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        name: firebaseUser.displayName,
      });

      const calories = await updateUserData(firebaseUser.uid);

      if (!calories) {
        router.replace("/(auth)/setDailyCalories");
      } else {
        router.replace("/(tabs)/Dashboard");
      }
    } else {
      setUser(null);
      router.replace("/(auth)/welcome");
    }
  });

  return () => unsub();
}, []);

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (error: any) {
      let msg = error.message;
      if (msg.includes("(auth/invalid-credential)")) msg = "invalid credentials";
      if (msg.includes("(auth/invalid-email)")) msg = "invalid email";
      return { success: false, msg };
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(fireStore, "users", response.user.uid), {
        uid: response.user.uid,
        name,
        email,
        dailyCalories: null, // initially null
      });
      return { success: true };
    } catch (error: any) {
      let msg = error.message;
      if (msg.includes("(auth/email-already-in-use)")) msg = "This email is already in use";
      if (msg.includes("(auth/invalid-email)")) msg = "invalid email";
      return { success: false, msg };
    }
  };

const updateUserData = async (uid: string): Promise<number | null> => {
  try {
    const docRef = doc(fireStore, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      const userData: UserType = {
        uid: data?.uid || null,
        email: data?.email || null,
        name: data?.name || null,
        image: data?.image || null,
      };
      setUser(userData);

      const calories = data?.dailyCalories || null;
      setDailyCalories(calories);

      return calories; 
    }
  } catch (error: any) {
    console.log("error fetching user data:", error);
  }
  return null;
};


  const contextValue: AuthContextType = {
    user,
    setUser,
    login,
    register,
    updateUserData,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be wrapped inside AuthProvider");
  }
  return context;
};
