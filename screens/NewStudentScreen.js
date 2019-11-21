import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import SnackBar from "react-native-snackbar-component";
import Button from "../shared/Button";
import ButtonText from "../shared/ButtonText";
import Container from "../shared/Container";
import ContainerSelect from "../shared/ContainerSelect";
import Input from "../shared/Input";
import Title from "../shared/Title";

function NewStudentScreen(props) {
	const [isLoading, setIsLoading] = useState(true);
	const [isSubmiting, setIsSubmiting] = useState(false);
	const [classrooms, setClassrooms] = useState([]);
	const [selectedClassrooms, setSelectedClassrooms] = useState([]);
	const [name, setName] = useState("");
	const [showSnackbar, setShowSnackbar] = useState(false);
	const [snackBarMessage, setSnackBarMessage] = useState("");

	useEffect(() => {
		if (showSnackbar) {
			setTimeout(() => {
				setShowSnackbar(false);
			}, 1500);
		}
	}, [showSnackbar]);

	async function fetchClassrooms() {
		await fetch("http://localhost:3000/classrooms")
			.then(async response => (await response).json())
			.then(async fetchedClassrooms => {
				setIsLoading(false);
				setClassrooms(fetchedClassrooms);
			});
	}

	async function handleSubmit() {
		setIsSubmiting(true);
		if (name.trim()) {
			if (selectedClassrooms.length) {
				await fetch("http://localhost:3000/students", {
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json"
					},
					method: "POST",
					body: JSON.stringify({
						name,
						quantity: 0,
						classrooms: selectedClassrooms
					})
				}).then(() => {
					props.navigation.state.params.fetchStudents();
					props.navigation.goBack();
				});
			} else {
				setSnackBarMessage("Selecione ao menos uma turma");
				setIsSubmiting(false);
				setShowSnackbar(true);
			}
		} else {
			setSnackBarMessage("O campo nome é obrigatório");
			setIsSubmiting(false);
			setShowSnackbar(true);
		}
	}

	useEffect(() => {
		fetchClassrooms();
	}, []);

	if (isLoading) {
		return (
			<Container>
				<ActivityIndicator size="large" color="#fc6663" />
			</Container>
		);
	}

	return (
		<Container>
			<SnackBar
				visible={showSnackbar}
				textMessage={snackBarMessage}
				autoHidingTime={1500}
				accentColor="#fc6663"
				actionHandler={() => setShowSnackbar(false)}
				actionText="Fechar"
			/>
			<Title>Cadastrar novo aluno</Title>
			<Input value={name} onChangeText={setName} placeholder="Nome" />
			<ContainerSelect>
				<SectionedMultiSelect
					items={classrooms}
					uniqueKey="id"
					displayKey="title"
					searchPlaceholderText="Pesquise pelo nome da turma..."
					selectText="Selecione ao menos uma turma"
					onSelectedItemsChange={setSelectedClassrooms}
					selectedItems={selectedClassrooms}
					confirmText={"Confirmar"}
					selectText={"Selecionar"}
					selectedText={"Selecionado"}
					removeAllText={"Remover todas as seleções"}
				/>
			</ContainerSelect>
			<Button
				disabled={isLoading || isSubmiting}
				onPress={() => handleSubmit()}
			>
				<ButtonText>Cadastrar</ButtonText>
			</Button>
		</Container>
	);
}

export default NewStudentScreen;
