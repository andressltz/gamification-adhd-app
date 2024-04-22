import 'react-native-gesture-handler'
import React, { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { AchievementsStack, TasksStack, MessagesStack, ProfileStack, LoginStack } from './stacks'
import { RegisterScreen, SplashScreen } from './screens'
import Icon from 'react-native-vector-icons/FontAwesome'
import { COLORS } from './assets'
import AsyncStorage from '@react-native-async-storage/async-storage'

const BottomTab = createBottomTabNavigator()

const getAuth = async () => {
	try {
		const token = await AsyncStorage.getItem('@App:token')
		return token
		// return token ? JSON.parse(token) : undefined
	} catch (error) {
		Alert.alert('Não foi possível carregar do storage', error)
		return undefined
	}
}

export default function App() {
	const [token, setToken] = useState(undefined)
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		setIsLoading(true)
		getAuth().then((data) => {
			if (data) {
				setToken(data)
			}
			setIsLoading(false)
		})
	}, [])

	if (isLoading) {
		return <SplashScreen />
	}

	return (
		<NavigationContainer>
			{!token ? (
				<BottomTab.Navigator
					screenOptions={{
						tabBarActiveTintColor: COLORS.WHITE,
						tabBarActiveBackgroundColor: COLORS.GREEN_SEC,
						tabBarInactiveTintColor: COLORS.WHITE,
						tabBarInactiveBackgroundColor: COLORS.GREEN_PRIM,
						tabBarStyle: [{ backgroundColor: COLORS.GREEN_PRIM, display: 'flex' }],
					}}>
					<BottomTab.Screen
						component={LoginStack}
						name='LoginStack'
						initialParams={{ setToken }}
						options={{
							tabBarIcon: ({ focused, color, size }) => <Icon name='user' size={size} color={color} />,
							tabBarLabel: 'Login',
							headerShown: false,
						}}
					/>
				</BottomTab.Navigator>
			) : (
				<BottomTab.Navigator
					screenOptions={{
						tabBarActiveTintColor: COLORS.WHITE,
						tabBarActiveBackgroundColor: COLORS.GREEN_SEC,
						tabBarInactiveTintColor: COLORS.WHITE,
						tabBarInactiveBackgroundColor: COLORS.GREEN_PRIM,
						tabBarStyle: [{ backgroundColor: COLORS.GREEN_PRIM, display: 'flex' }],
					}}>
					<BottomTab.Screen
						component={TasksStack}
						name='Tarefas'
						options={{
							tabBarIcon: ({ focused, color, size }) => <Icon name='tasks' size={size} color={color} />,
							tabBarLabel: 'Tarefas',
							headerShown: false,
						}}
					/>
					<BottomTab.Screen
						component={AchievementsStack}
						name='AchievementsStack'
						options={{
							tabBarIcon: ({ focused, color, size }) => <Icon name='child' size={size} color={color} />,
							tabBarLabel: 'Conquistas',
							headerShown: false,
						}}
					/>
					<BottomTab.Screen
						component={MessagesStack}
						name='MessagesStack'
						options={{
							tabBarIcon: ({ focused, color, size }) => <Icon name='wechat' size={size} color={color} />,
							tabBarLabel: 'Chat',
							headerShown: false,
						}}
					/>
					<BottomTab.Screen
						component={ProfileStack}
						initialParams={{ setToken }}
						name='ProfileStack'
						options={{
							tabBarIcon: ({ focused, color, size }) => <Icon name='user' size={size} color={color} />,
							tabBarLabel: 'Perfil',
							headerShown: false,
						}}
					/>
				</BottomTab.Navigator>
			)}
		</NavigationContainer>
	)
}
