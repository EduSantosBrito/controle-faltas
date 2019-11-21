import React from 'react';
import Container from '../shared/Container';
import Logo from '../shared/Logo';
import Title from '../shared/Title';

function HomeScreen(props) {
    return <Container>
        <Logo source={require('../assets/logo.png')} resizeMode="contain"/>
        <Title>Cadastro de Faltas</Title>
    </Container>
}

export default HomeScreen;