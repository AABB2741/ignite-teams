import { useCallback, useState } from "react";
import { FlatList } from "react-native";

import { Header } from "@/components/header";
import { Highlight } from "@/components/highlight";
import { GroupCard } from "@/components/group-card";
import { ListEmpty } from "@/components/list-empty";
import { Button } from "@/components/button";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { Container } from "./styles";
import { groupsGetAll } from "@/storage/group/groups-get-all";
import { Loading } from "@/components/loading";

export function Groups() {
	const [isLoading, setIsLoading] = useState(true);
	const [groups, setGroups] = useState<string[]>([]);

	const navigation = useNavigation();

	function handleNewGroup() {
		navigation.navigate("new");
	}

	async function fetchGroups() {
		try {
			setIsLoading(true);
			const data = await groupsGetAll();

			setGroups(data);
		} catch (err) {
			console.error(err);
		} finally {
			setIsLoading(false);
		}
	}

	function handleOpenGroup(group: string) {
		navigation.navigate("players", { group });
	}

	useFocusEffect(
		useCallback(() => {
			fetchGroups();
		}, [])
	);

	return (
		<Container>
			<Header />

			<Highlight title="Turmas" subtitle="jogue com a sua turma" />

			{isLoading ? (
				<Loading />
			) : (
				<FlatList
					data={groups}
					keyExtractor={(item) => item}
					renderItem={({ item }) => (
						<GroupCard
							title={item}
							onPress={() => handleOpenGroup(item)}
						/>
					)}
					contentContainerStyle={groups.length === 0 && { flex: 1 }}
					ListEmptyComponent={() => (
						<ListEmpty message="Que tal cadastrar a primeira turma?" />
					)}
				/>
			)}

			<Button title="Criar nova turma" onPress={handleNewGroup} />
		</Container>
	);
}
