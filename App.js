import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import HomeScreen from "./screens/HomeScreen";
import ClassroomListScreen from "./screens/ClassroomListScreen";
import NewClassroomScreen from "./screens/NewClassroomScreen";
import ClassroomFaultScreen from "./screens/ClassroomFaultScreen";
import StudentListScreen from "./screens/StudentListScreen";
import NewStudentScreen from "./screens/NewStudentScreen";
import TabIcon from "./shared/TabIcon";

const ClassroomNavigator = createStackNavigator({
	ClassroomList: {
		screen: ClassroomListScreen,
		navigationOptions: {
			title: "Listagem de Turmas"
		}
	},
	NewClassroom: {
		screen: NewClassroomScreen,
		navigationOptions: {
			title: "Nova Turma"
		}
	},
	ClassroomFault: {
		screen: ClassroomFaultScreen,
		navigationOptions: {
			title: "Faltas da turma"
		}
	}
});

ClassroomNavigator.navigationOptions = {
	tabBarLabel: "Classes",
	tabBarOptions: { 
        activeTintColor: '#fc6663',
		inactiveTintColor: '#999',
	},
	tabBarIcon: ({ focused }) => {
		return <TabIcon focused={focused} name="university" />;
	}
};

const StudentNavigator = createStackNavigator({
	StudentList: {
		screen: StudentListScreen,
		navigationOptions: {
			title: "Listagem de Alunos"
		}
	},
	NewStudent: {
		screen: NewStudentScreen,
		navigationOptions: {
			title: "Novo Aluno"
		}
	}
});

StudentNavigator.navigationOptions = {
	tabBarLabel: "Alunos",
	tabBarOptions: { 
        activeTintColor: '#fc6663',
		inactiveTintColor: '#999',
	},
	tabBarIcon: ({ focused }) => {
		return <TabIcon focused={focused} name="user-graduate" />;
	}
};

const HomeNavigator = createStackNavigator({
	Home: {
		screen: HomeScreen,
		navigationOptions: {
			title: "Home"
		}
	}
});

HomeNavigator.navigationOptions = {
	tabBarLabel: "Home",
	tabBarOptions: { 
        activeTintColor: '#fc6663',
		inactiveTintColor: '#999',
	},
	tabBarIcon: ({ focused }) => {
		return <TabIcon focused={focused} name="home" />;
	}
};
const AppNavigator = createBottomTabNavigator({
	HomeNavigator,
	StudentNavigator,
	ClassroomNavigator
});

export default createAppContainer(AppNavigator);
