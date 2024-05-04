// import 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView, useWindowDimensions, View } from 'react-native'
import FontAwesomeIcon from 'react-native-vector-icons/dist/FontAwesome'
import { COLORS } from './assets'
import { RegisterScreen, SplashScreen } from './screens'
import { AchievementsStack, LoginStack, MessagesStack, ProfileStack, TasksStack } from './stacks'

const BottomTab = createBottomTabNavigator()

const getAuth = async () => {
	try {
		return await AsyncStorage.getItem('@App:token')
	} catch (error) {
		return undefined
	}
}

export default function App() {
	const [token, setToken] = useState(undefined)
	const [isLoading, setIsLoading] = useState(false)
	const { height } = useWindowDimensions()

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
		// <SafeAreaView style={globalStyles.safeArea}>
		<View style={[{ height }, StyleSheet.absoluteFill]}>
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
								tabBarIcon: ({ focused, color, size }) => <FontAwesomeIcon name='user' size={0} color={color} />,
								tabBarLabel: '',
								headerShown: false,
								tabBarStyle: { height: 2 },
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
								tabBarIcon: ({ focused, color, size }) => <FontAwesomeIcon name='tasks' size={size} color={color} />,
								tabBarLabel: 'Tarefas',
								headerShown: false,
							}}
						/>
						<BottomTab.Screen
							component={AchievementsStack}
							name='AchievementsStack'
							options={{
								tabBarIcon: ({ focused, color, size }) => <FontAwesomeIcon name='child' size={size} color={color} />,
								tabBarLabel: 'Conquistas',
								lazy: false,
								// unmountOnBlur: true,
								headerShown: false,
							}}
						/>
						{/* <BottomTab.Screen
							component={MessagesStack}
							name='MessagesStack'
							options={{
								tabBarIcon: ({ focused, color, size }) => <FontAwesomeIcon name='wechat' size={size} color={color} />,
								tabBarLabel: 'Chat',
								headerShown: false,
							}}
						/> */}
						<BottomTab.Screen
							component={ProfileStack}
							initialParams={{ setToken }}
							name='ProfileStack'
							options={{
								tabBarIcon: ({ focused, color, size }) => <FontAwesomeIcon name='user' size={size} color={color} />,
								unmountOnBlur: true,
								tabBarLabel: 'Perfil',
								headerShown: false,
							}}
						/>
					</BottomTab.Navigator>
				)}
			</NavigationContainer>
		</View>
		// </SafeAreaView>
	)
}
