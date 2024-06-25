import AsyncStorage from "@react-native-async-storage/async-storage";

import { PlayerStorageDTO } from "./player-storage-dto";

import { PLAYER_COLLECTION } from "../storage-config";
import { playersGetByGroup } from "./players-get-by-group";
import { AppError } from "@/utils/app-error";

export async function playerAddByGroup(
	newPlayer: PlayerStorageDTO,
	group: string
) {
	const storedPlayers = await playersGetByGroup(group);

	const playersAlreadyExists =
		storedPlayers.filter((player) => player.name === newPlayer.name)
			.length > 0;

	if (playersAlreadyExists) {
		throw new AppError("Essa pessoa já está adicionada em um time aqui.");
	}

	const storage = JSON.stringify([...storedPlayers, newPlayer]);

	await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, storage);
}
