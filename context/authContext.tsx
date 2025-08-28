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

  // Listen for auth state changes
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Set basic user info
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          name: firebaseUser.displayName,
        });

        // Fetch additional user data from Firestore
        await updateUserData(firebaseUser.uid);

        // Redirect based on whether dailyCalories is set
        if (!dailyCalories) {
          router.replace("/(auth)/setDailyCalories"); // first-time setup
        } else {
          router.replace("/(tabs)/Dashboard"); // normal login
        }
      } else {
        setUser(null);
        router.replace("/(auth)/welcome");
      }
    });

    return () => unsub();
  }, [dailyCalories]);

  // Login function
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

  // Register function
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

  // Fetch user data from Firestore
  const updateUserData = async (uid: string) => {
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
        setDailyCalories(data?.dailyCalories || null);
      }
    } catch (error: any) {
      console.log("error fetching user data:", error);
    }
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
