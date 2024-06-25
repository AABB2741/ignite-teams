import { useState } from "react";
import { Alert } from "react-native";

import { useNavigation } from "@react-navigation/native";

import { groupCreate } from "@/storage/group/group-create";
import { AppError } from "@/utils/app-error";

import { Header } from "@/components/header";
import { Highlight } from "@/components/highlight";
import { Button } from "@/components/button";
import { Input } from "@/components/input";

import { Container, Content, Icon } from "./styles";

export function NewGroup() {
	const [group, setGroup] = useState("");

	const navigation = useNavigation();

	async function handleNew() {
		try {
			if (group.trim().length === 0) {
				return Alert.alert("Novo grupo", "Informe o nome da turma.");
			}

			await groupCreate(group);

			navigation.navigate("players", {
				group,
			});
		} catch (err) {
			if (err instanceof AppError) {
				Alert.alert("Novo grupo", err.message);
			} else {
				Alert.alert(
					"Novo grupo",
					"Não foi possível criar um novo grupo."
				);
				console.error(err);
			}
		}
	}

	return (
		<Container>
			<Header showBackButton />

			<Content>
				<Icon />

				<Highlight
					title="Nova turma"
					subtitle="crie a turma para adicionar as pessoas"
				/>

				<Input
					placeholder="Nome da turma"
					value={group}
					onChangeText={setGroup}
				/>

				<Button
					title="Criar"
					style={{ marginTop: 20 }}
					onPress={handleNew}
				/>
			</Content>
		</Container>
	);
}
