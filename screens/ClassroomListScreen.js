import React, { useState, useEffect } from "react";
import Container from "../shared/Container";
import { Text, ActivityIndicator, FlatList } from "react-native";
import FloatingButton from "../shared/FloatingButton";
import Icon from "react-native-vector-icons/FontAwesome5";
import { ListItem } from "react-native-elements";
import ContainerList from "../shared/ContainerList";

function ClassroomListScreen(props) {
	const [isLoading, setIsLoading] = useState(true);
	const [classrooms, setClassrooms] = useState([]);

	function fetchClassrooms() {
		setIsLoading(true);
		fetch("http://localhost:3000/classrooms")
			.then(async response => (await response).json())
			.then(async fetchedClassrooms => {
				const classroomsToList = [];
				await Promise.all(
					fetchedClassrooms.map(async fetchedClassroom => {
						await fetch(
							`http://localhost:3000/students?classrooms_like=${fetchedClassroom.id}`
						)
							.then(async response => (await response).json())
							.then(students => {
								classroomsToList.push({
									...fetchedClassroom,
									studentQuantity: students.length
								});
							});
					})
				);
				setClassrooms(classroomsToList);
				setIsLoading(false);
			});
	}

	function keyExtractor(item, index) {
		return index.toString();
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
			{classrooms.length ? (
				<ContainerList>
					<FlatList
						keyExtractor={keyExtractor}
						data={classrooms.sort((a, b) => {
							if (a.title > b.title) {
								return 1;
							}
							if (a.title < b.title) {
								return -1;
							}
							return 0;
						})}
						renderItem={({ item }) => {
							return (
								<ListItem
									onPress={() =>
										props.navigation.navigate(
											"ClassroomFault",
											{
												classroom: item,
												fetchClassrooms
											}
										)
									}
									title={item.title}
									subtitle={`Quantidade de alunos: ${item.studentQuantity}`}
									bottomDivider
									chevron
								/>
							);
						}}
					/>
				</ContainerList>
			) : (
				<Text>Não há classes cadastradas</Text>
			)}
			<FloatingButton
				onPress={() =>
					props.navigation.navigate("NewClassroom", {
						fetchClassrooms
					})
				}
			>
				<Icon name="plus" size={20} color="#fff" />
			</FloatingButton>
		</Container>
	);
}

export default ClassroomListScreen;
