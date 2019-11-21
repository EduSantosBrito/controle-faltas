import React, { useState, useEffect } from "react";
import Container from "../shared/Container";
import Title from "../shared/Title";
import Input from "../shared/Input";
import Button from "../shared/Button";
import ButtonText from "../shared/ButtonText";
import SnackBar from "react-native-snackbar-component";

function NewClassroomScreen(props) {
	const [title, setTitle] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [showSnackbar, setShowSnackbar] = useState(false);

	useEffect(() => {
		if (showSnackbar) {
			setTimeout(() => {
				setShowSnackbar(false);
			}, 1500);
		}
	}, [showSnackbar]);

	function handleSubmit() {
		setIsLoading(true);
		if (title.trim()) {
			fetch("http://localhost:3000/classrooms/", {
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json"
				},
				method: "POST",
				body: JSON.stringify({ title })
			}).then(() => {
				props.navigation.state.params.fetchClassrooms();
				props.navigation.goBack();
			});
		} else {
			setIsLoading(false);
			setShowSnackbar(true);
		}
	}

	return (
		<Container>
			<SnackBar
				visible={showSnackbar}
				textMessage="O campo Matéria é obrigatório"
				accentColor="#fc6663"
				autoHidingTime={1500}
				actionHandler={() => setShowSnackbar(false)}
				actionText="Fechar"
			/>
			<Title>Cadastrar nova turma</Title>
			<Input
				value={title}
				onChangeText={setTitle}
				placeholder="Matéria"
			/>
			<Button disabled={isLoading} onPress={() => handleSubmit()}>
				<ButtonText>Cadastrar</ButtonText>
			</Button>
		</Container>
	);
}

export default NewClassroomScreen;
