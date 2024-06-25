import { Alert, FlatList, TextInput } from "react-native";
import { useEffect, useRef, useState } from "react";

import { Header } from "@/components/header";
import { Highlight } from "@/components/highlight";
import { ButtonIcon } from "@/components/button-icon";
import { Input } from "@/components/input";
import { Filter } from "@/components/filter";
import { PlayerCard } from "@/components/player-card";

import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";
import { ListEmpty } from "@/components/list-empty";
import { Button } from "@/components/button";
import { useNavigation, useRoute } from "@react-navigation/native";
import { PlayerStorageDTO } from "@/storage/player/player-storage-dto";
import { AppError } from "@/utils/app-error";
import { playerAddByGroup } from "@/storage/player/player-add-by-group";
import { playerGetByGroupAndTeam } from "@/storage/player/player-get-by-group-and-team";
import { playerRemoveByGroup } from "@/storage/player/player-remove-by-group";
import { groupRemoveByName } from "@/storage/group/group-remove-by-name";
import { Loading } from "@/components/loading";

interface RouteParams {
	group: string;
}

export function Players() {
	const [isLoading, setIsLoading] = useState(true);
	const [newPlayerName, setNewPlayerName] = useState("");
	const [team, setTeam] = useState<"Time A" | "Time B">("Time A");
	const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);

	const navigation = useNavigation();
	const route = useRoute();
	const { group } = route.params as RouteParams;

	const newPlayerNameInputRef = useRef<TextInput>(null);

	async function handleAddPlayer() {
		if (newPlayerName.trim().length === 0) {
			return Alert.alert(
				"Nova pessoa",
				"Informe o nome da pessoa para adicionar."
			);
		}

		const newPlayer: PlayerStorageDTO = {
			name: newPlayerName,
			team,
		};

		try {
			await playerAddByGroup(newPlayer, group);
			await fetchPlayersByTeam();

			setNewPlayerName("");
			newPlayerNameInputRef.current?.blur();
		} catch (err) {
			if (err instanceof AppError) {
				Alert.alert("Nova pessoa", err.message);
			} else {
				Alert.alert("Nova pessoa", "Não foi possível adicionar.");
				console.error(err);
			}
		}
	}

	async function fetchPlayersByTeam() {
		try {
			setIsLoading(true);
			const playersByTeam = await playerGetByGroupAndTeam(group, team);
			setPlayers(playersByTeam);
		} catch (err) {
			Alert.alert(
				"Pessoas",
				"Não foi possível carregar as pessoas do time selecionado."
			);
			console.error(err);
		} finally {
			setIsLoading(false);
		}
	}

	async function handleRemovePlayer(playerName: string) {
		try {
			await playerRemoveByGroup(playerName, group);
			await fetchPlayersByTeam();
		} catch (err) {
			Alert.alert(
				"Remover pessoa",
				"Não foi possível remover essa pessoa."
			);
		}
	}

	async function groupRemove() {
		try {
			await groupRemoveByName(group);
			navigation.navigate("groups");
		} catch (err) {
			console.error(err);
			Alert.alert("Remover turma", "Não foi possível remover a turma.");
		}
	}

	async function handleGroupRemove() {
		Alert.alert("Remover", "Deseja remover a turma?", [
			{
				text: "Não",
				style: "cancel",
			},
			{
				text: "Sim",
				onPress: groupRemove,
			},
		]);
	}

	useEffect(() => {
		fetchPlayersByTeam();
	}, [team]);

	return (
		<Container>
			<Header showBackButton />

			<Highlight
				title={group}
				subtitle="adicione a galera e separe os times"
			/>

			<Form>
				<Input
					placeholder="Nome da pessoa"
					autoCorrect={false}
					value={newPlayerName}
					onChangeText={setNewPlayerName}
					ref={newPlayerNameInputRef}
					onSubmitEditing={handleAddPlayer}
					returnKeyType="done"
				/>

				<ButtonIcon icon="add" onPress={handleAddPlayer} />
			</Form>

			<HeaderList>
				<FlatList
					data={["Time A", "Time B"] as const}
					keyExtractor={(item) => item}
					renderItem={({ item }) => (
						<Filter
							title={item}
							isActive={item === team}
							onPress={() => setTeam(item)}
						/>
					)}
					horizontal
				/>

				<NumberOfPlayers>{players.length}</NumberOfPlayers>
			</HeaderList>

			{isLoading ? (
				<Loading />
			) : (
				<FlatList
					data={players}
					keyExtractor={(item) => item.name}
					renderItem={({ item }) => (
						<PlayerCard
							name={item.name}
							onRemove={() => handleRemovePlayer(item.name)}
						/>
					)}
					ListEmptyComponent={() => (
						<ListEmpty message="Não há pessoas nesse time." />
					)}
					showsVerticalScrollIndicator={false}
					contentContainerStyle={[
						{ paddingBottom: 100 },
						players.length === 0 && { flex: 1 },
					]}
				/>
			)}

			<Button
				title="Remover turma"
				type="secondary"
				onPress={handleGroupRemove}
			/>
		</Container>
	);
}
