import { create } from "zustand";
import { persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

type MealLog = {
  calories: number;
  section: "Breakfast" | "Lunch" | "Dinner" | "Snack";
  id: string;
};

type MealStore = {
  calorieCount: number;
  dailyCalories: number | null;
  setCalorieCount: (newCount: number) => void;
  decrementCalorieCount: (loss: number) => void;
  incrementCalorieCount: (gain: number) => void;
  clearCalorieCount: () => void;
  mealLogs: MealLog[];
  addMeal: (section: MealLog["section"], calories: number) => void;
  setDailyCalories: (value: number) => void;
  clearDailyCalories: () => void;
};

export const useMealStore = create<MealStore>()(
  persist(
    (set) => ({
      calorieCount: 0,
      dailyCalories: null,

      setCalorieCount: (newCount) => set({ calorieCount: newCount }),
      decrementCalorieCount: (loss) =>
        set((state) => ({ calorieCount: state.calorieCount - loss })),
      incrementCalorieCount: (gain) =>
        set((state) => ({ calorieCount: state.calorieCount + gain })),
      clearCalorieCount: () => set({ calorieCount: 0 }),

      mealLogs: [],
      addMeal: (section, calories) =>
        set((state) => {
          const newMeal: MealLog = {
            id: Date.now().toString(), 
            section,
            calories,
          };
          return {
            mealLogs: [...state.mealLogs, newMeal],
          };
        }),

      setDailyCalories: (value) => set({ dailyCalories: value }),
      clearDailyCalories: () => set({ dailyCalories: null }),
    }),
    {
      name: "meal-storage",
      storage: {
        getItem: async (name) => {
          const value = await AsyncStorage.getItem(name);
          return value ? JSON.parse(value) : null;
        },
        setItem: async (name, value) => {
          await AsyncStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: async (name) => {
          await AsyncStorage.removeItem(name);
        },
      },
    }
  )
);
