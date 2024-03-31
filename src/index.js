import 'react-native-gesture-handler';
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { AchievementsStack, TasksStack, MessagesStack, ProfileStack } from './stacks'
import Icon from 'react-native-vector-icons/FontAwesome'

const BottomTab = createBottomTabNavigator()

export default function App() {
	return (
		<NavigationContainer>
			<BottomTab.Navigator tabBarOptions={{activeTintColor: '#FFFFFF', activeBackgroundColor: '#006E1B', inactiveTintColor:'#FFFFFF', inactiveBackgroundColor: '#008120'}}>
				<BottomTab.Screen component={TasksStack} name='TasksStack' options={{
					tabBarIcon:({focused, color, size}) => (
						<Icon name='tasks' size={size} color={color} />
					),
					tabBarLabel:'Tarefas',
				}} />
				<BottomTab.Screen component={AchievementsStack} name='AchievementsStack' options={{
					tabBarIcon:({focused, color, size}) => (
						<Icon name='child' size={size} color={color} />
					),
					tabBarLabel:'Conquistas',
				}} />
				<BottomTab.Screen component={MessagesStack} name='MessagesStack' options={{
					tabBarIcon:({focused, color, size}) => (
						<Icon name='wechat' size={size} color={color} />
					),
					tabBarLabel:'Chat',
				}} />
				<BottomTab.Screen component={ProfileStack} name='ProfileStack' options={{
					tabBarIcon:({focused, color, size}) => (
						<Icon name='user' size={size} color={color} />
					),
					tabBarLabel:'Perfil',
				}} />
			</BottomTab.Navigator>
		</NavigationContainer>
	)
}
