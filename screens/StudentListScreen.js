import React, { useEffect, useState } from "react";
import { Text, ActivityIndicator, FlatList } from "react-native";
import Container from "../shared/Container";
import ContainerList from "../shared/ContainerList";
import FloatingButton from "../shared/FloatingButton";
import Icon from "react-native-vector-icons/FontAwesome5";
import SnackBar from "react-native-snackbar-component";
import { ListItem } from "react-native-elements";

function StudentListScreen(props) {
	const [isLoading, setIsLoading] = useState(true);
	const [showSnackbar, setShowSnackbar] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState("");
	const [students, setStudents] = useState([]);

	async function fetchStudents() {
		await fetch("http://localhost:3000/students")
			.then(async response => (await response).json())
			.then(async fetchedStudents => {
				setStudents(fetchedStudents);
				setIsLoading(false);
			});
	}

	async function handleDeleteStudent(id) {
		await fetch(`http://localhost:3000/students/${id}`, {
			method: "DELETE",
			redirect: "manual"
		}).then(() => {
			setSnackbarMessage("Aluno removido.");
			setShowSnackbar(true);
			fetchStudents();
		});
	}

	useEffect(() => {
		fetchStudents();
	}, []);

	useEffect(() => {
		if (showSnackbar) {
			setTimeout(() => {
				setShowSnackbar(false);
			}, 1500);
		}
	}, [showSnackbar]);

	if (isLoading) {
		return (
			<Container>
				<ActivityIndicator size="large" color="#fc6663" />
			</Container>
		);
	}

	function keyExtractor(item, index) {
		return index.toString();
	}

	return (
		<Container>
			<SnackBar
				visible={showSnackbar}
				textMessage={snackbarMessage}
				accentColor="#fc6663"
				autoHidingTime={1500}
				actionHandler={() => setShowSnackbar(false)}
				actionText="Fechar"
			/>
			{students.length ? (
				<ContainerList>
					<FlatList
						keyExtractor={keyExtractor}
						data={students.sort((a, b) => {
							if (a.id > b.id) {
								return 1;
							}
							if (a.id < b.id) {
								return -1;
							}
							return 0;
						})}
						renderItem={({ item }) => {
							return (
								<ListItem
									title={item.name}
									subtitle={`Matrícula: ${item.id}`}
									bottomDivider
									chevron={
										<Icon
											onPress={() =>
												handleDeleteStudent(item.id)
											}
											name="trash"
											size={20}
											color="#fc6663"
										/>
									}
								/>
							);
						}}
					/>
				</ContainerList>
			) : (
				<Text>Não há alunos cadastrados</Text>
			)}
			<FloatingButton
				onPress={() =>
					props.navigation.navigate("NewStudent", { fetchStudents })
				}
			>
				<Icon name="plus" size={20} color="#fff" />
			</FloatingButton>
		</Container>
	);
}

export default StudentListScreen;
