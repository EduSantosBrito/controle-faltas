import React, { useEffect, useState } from "react";
import { Text, ActivityIndicator, FlatList } from "react-native";
import Counter from "react-native-counters";
import Container from "../shared/Container";
import ContainerList from "../shared/ContainerList";
import { ListItem } from "react-native-elements";
import Button from "../shared/Button";
import ButtonText from "../shared/ButtonText";

function ClassroomFaultScreen(props) {
	const [isLoading, setIsLoading] = useState(true);
	const [isSubmiting, setIsSubmiting] = useState(false);
	const [students, setStudents] = useState([]);

	function fetchStudents() {
		const classroomParam = props.navigation.getParam("classroom");
		fetch(
			`http://localhost:3000/students?classrooms_like=${classroomParam.id}`
		)
			.then(async response => await response.json())
			.then(fetchedStudents => {
				setStudents(fetchedStudents);
				setIsLoading(false);
			});
	}

	async function handleSubmit() {
		setIsSubmiting(true);
		await Promise.all(
			students.map(async student => {
				await fetch(`http://localhost:3000/students/${student.id}`, {
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json"
					},
					method: "PUT",
					body: JSON.stringify(student)
				});
			})
		);
		setIsSubmiting(false);
		props.navigation.state.params.fetchClassrooms();
		props.navigation.goBack();
	}

	async function handleDelete() {
		const classroomParam = props.navigation.getParam("classroom");
		fetch(`http://localhost:3000/classrooms/${classroomParam.id}`, {
			method: "DELETE"
		}).then(() => {
			props.navigation.state.params.fetchClassrooms();
			props.navigation.goBack();
		});
	}

	function keyExtractor(item, index) {
		return index.toString();
	}

	useEffect(() => {
		fetchStudents();
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
			{students.length ? (
				<>
					<ContainerList>
						<FlatList
							keyExtractor={keyExtractor}
							data={students}
							renderItem={({ item }) => {
								return (
									<ListItem
										title={item.name}
										subtitle={`Matrícula: ${item.id}`}
										bottomDivider
										chevron={() => (
											<Counter
												start={item.quantity}
												onChange={(number, type) => {
													const newItem = {
														...item,
														quantity:
															type === "+"
																? item.quantity +
																  1
																: item.quantity -
																  1
													};
													const newStudents = [
														...students.filter(
															student =>
																student.id !==
																item.id
														),
														newItem
													].sort((a, b) => {
														if (a.id > b.id) {
															return 1;
														}
														if (a.id < b.id) {
															return -1;
														}
														return 0;
													});
													setStudents(newStudents);
												}}
											/>
										)}
									/>
								);
							}}
						/>
					</ContainerList>
					<Button
						disabled={isLoading || isSubmiting}
						onPress={() => handleSubmit()}
					>
						<ButtonText>Salvar</ButtonText>
					</Button>
				</>
			) : (
				<Container>
					<Text>Não há estudantes cadastrados</Text>
					<Button onPress={() => handleDelete()}>
						<ButtonText>Excluir turma</ButtonText>
					</Button>
				</Container>
			)}
		</Container>
	);
}

export default ClassroomFaultScreen;
