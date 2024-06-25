import AsyncStorage from "@react-native-async-storage/async-storage";
import { groupsGetAll } from "./groups-get-all";
import { GROUP_COLLECTION, PLAYER_COLLECTION } from "../storage-config";

export async function groupRemoveByName(groupToDelete: string) {
	const storedGroups = await groupsGetAll();
	const groups = storedGroups.filter((group) => group !== groupToDelete);

	await AsyncStorage.setItem(GROUP_COLLECTION, JSON.stringify(groups));
	await AsyncStorage.removeItem(`${PLAYER_COLLECTION}-${groupToDelete}`);
}
