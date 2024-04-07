import 'react-native-gesture-handler';
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { AchievementsStack, TasksStack, MessagesStack, ProfileStack, LoginStack } from './stacks'
import Icon from 'react-native-vector-icons/FontAwesome'

const BottomTab = createBottomTabNavigator()

export default function App() {
	return (
		<NavigationContainer>
			<BottomTab.Navigator screenOptions={{
				tabBarActiveTintColor: '#FFFFFF', tabBarActiveBackgroundColor: '#006E1B', tabBarInactiveTintColor:'#FFFFFF', tabBarInactiveBackgroundColor: '#008120',
				tabBarStyle: [{backgroundColor: '#008120', display: 'flex'}]
			}}>
				<BottomTab.Screen component={TasksStack} name='Tarefas' options={{
					tabBarIcon:({focused, color, size}) => (
						<Icon name='tasks' size={size} color={color} />
					),
					tabBarLabel:'Tarefas',
					headerShown: false
				}} />
				<BottomTab.Screen component={AchievementsStack} name='AchievementsStack' options={{
					tabBarIcon:({focused, color, size}) => (
						<Icon name='child' size={size} color={color} />
					),
					tabBarLabel:'Conquistas',
					headerShown: false
				}} />
				<BottomTab.Screen component={MessagesStack} name='MessagesStack' options={{
					tabBarIcon:({focused, color, size}) => (
						<Icon name='wechat' size={size} color={color} />
					),
					tabBarLabel:'Chat',
					headerShown: false
				}} />
				<BottomTab.Screen component={ProfileStack} name='ProfileStack' options={{
					tabBarIcon:({focused, color, size}) => (
						<Icon name='user' size={size} color={color} />
					),
					tabBarLabel:'Perfil',
					headerShown: false
				}} />
				<BottomTab.Screen component={LoginStack} name='LoginStack' options={{
					tabBarIcon:({focused, color, size}) => (
						<Icon name='user' size={size} color={color} />
					),
					tabBarLabel:'Login',
					headerShown: false
				}} />
			</BottomTab.Navigator>
		</NavigationContainer>
	)
}
