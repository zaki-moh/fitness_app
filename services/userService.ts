import { UserDataType, ResponseType } from "@/types";
import { doc, Firestore, updateDoc } from "firebase/firestore";
import { fireStore } from "@/config/firebase";

export const updateUser = async (
    uid: string,
    updatedData: UserDataType
): Promise<ResponseType> => {

    try {
        const useRef = doc(fireStore, "users", uid);
        await updateDoc(useRef, updatedData);
        return {success: true, msg: "updated successfully"};
    } catch(error: any) {
        return { success: false };
    }

}