import { playersGetByGroup } from "./players-get-by-group";

export async function playerGetByGroupAndTeam(group: string, team: string) {
	const storage = await playersGetByGroup(group);

	const players = storage.filter((player) => player.team === team);

	return players;
}
