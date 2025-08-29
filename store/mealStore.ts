import { create } from "zustand"

type MealLog = {
  calories: number;
  section: "Breakfast" | "Lunch" | "Dinner" | "Snack";
  id: string;
};

type MealStore = {
  calorieCount: number;
  setCalorieCount: (newCount: number) => void;
  decrementCalorieCount: (loss: number) => void;
  clearCalorieCount: () => void;
  mealLogs: MealLog[];
  addMeal: (meal: MealLog) => void;
};

export const useMealStore = create<MealStore>((set) => ({
  calorieCount: 0,
  setCalorieCount: (newCount) => set({ calorieCount: newCount }),
  decrementCalorieCount: (loss) => set((state) => ({ calorieCount: state.calorieCount - loss })),
  clearCalorieCount: () => set({ calorieCount: 0 }),
  mealLogs: [],
  addMeal: (meal) => set((state) => ({ mealLogs: [...state.mealLogs, meal] })),
}));

