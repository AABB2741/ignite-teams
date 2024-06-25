import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION } from "../storage-config";
import { groupsGetAll } from "./groups-get-all";
import { AppError } from "@/utils/app-error";

export async function groupCreate(newGroup: string) {
	const storedGroups = await groupsGetAll();

	const groupAlreadyExists = storedGroups.includes(newGroup);

	if (groupAlreadyExists) {
		throw new AppError("Já existe um grupo cadastrado com esse nome.");
	}

	const storage = JSON.stringify([...storedGroups, newGroup]);

	await AsyncStorage.setItem(GROUP_COLLECTION, storage);
}
