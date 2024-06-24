import { FlatList } from "react-native";
import { useState } from "react";

import { Header } from "@/components/header";
import { Highlight } from "@/components/highlight";
import { ButtonIcon } from "@/components/button-icon";
import { Input } from "@/components/input";
import { Filter } from "@/components/filter";
import { PlayerCard } from "@/components/player-card";

import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";
import { ListEmpty } from "@/components/list-empty";
import { Button } from "@/components/button";
import { useRoute } from "@react-navigation/native";

interface RouteParams {
	group: string;
}

export function Players() {
	const [team, setTeam] = useState<"Time A" | "Time B">("Time A");
	const [players, setPlayers] = useState([
		"Jair",
		"Messias",
		"Bolsonaro",
		"Julia",
		"Joao",
		"Augusto",
		"Ana",
		"Peidei",
		"kkk",
		"123",
	]);

	const route = useRoute();
	const { group } = route.params as RouteParams;

	return (
		<Container>
			<Header showBackButton />

			<Highlight
				title={group}
				subtitle="adicione a galera e separe os times"
			/>

			<Form>
				<Input placeholder="Nome da pessoa" autoCorrect={false} />

				<ButtonIcon icon="add" />
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

			<FlatList
				data={players}
				keyExtractor={(item) => item}
				renderItem={({ item }) => (
					<PlayerCard name={item} onRemove={() => {}} />
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

			<Button title="Remover turma" type="secondary" />
		</Container>
	);
}
