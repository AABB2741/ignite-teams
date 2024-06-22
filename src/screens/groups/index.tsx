import { useState } from "react";
import { FlatList } from "react-native";

import { Header } from "@/components/header";
import { Highlight } from "@/components/highlight";
import { GroupCard } from "@/components/group-card";
import { ListEmpty } from "@/components/list-empty";
import { Button } from "@/components/button";
import { useNavigation } from "@react-navigation/native";

import { Container } from "./styles";

export function Groups() {
	const [groups, setGroups] = useState<string[]>([]);

	const navigation = useNavigation();

	function handleNewGroup() {
		navigation.navigate("new");
	}

	return (
		<Container>
			<Header />

			<Highlight title="Turmas" subtitle="jogue com a sua turma" />

			<FlatList
				data={groups}
				keyExtractor={(item) => item}
				renderItem={({ item }) => <GroupCard title={item} />}
				contentContainerStyle={groups.length === 0 && { flex: 1 }}
				ListEmptyComponent={() => (
					<ListEmpty message="Que tal cadastrar a primeira turma?" />
				)}
			/>

			<Button title="Criar nova turma" onPress={handleNewGroup} />
		</Container>
	);
}
