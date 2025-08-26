import { create } from "zustand"

export const useMealStore = create((set) => ({
    calorieCount: 0,
    setCalorieCount: (newCount) => set({calorieCount: newCount}),
    decrementCalorieCount: (loss) => set((state) => ({calorieCount: state.calorieCount - loss})),
    clearCalorieCount: () => set({calorieCount: 0})
}))