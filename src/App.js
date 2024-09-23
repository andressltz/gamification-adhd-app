// import 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Dimensions, useWindowDimensions, View } from 'react-native'
import FontAwesomeIcon from 'react-native-vector-icons/dist/FontAwesome'
import { COLORS } from './assets'
import { ProfileSwitchModal } from './modals'
import { RegisterScreen, SplashScreen } from './screens'
import { ApiClient } from './services'
import { AchievementsStack, LoginStack, MessagesStack, ProfileStack, TasksStack } from './stacks'

const BottomTab = createBottomTabNavigator()
const constHeight = Dimensions.get('window').height

const getAuth = async () => {
	try {
		return await AsyncStorage.getItem('@App:token')
	} catch (error) {
		return undefined
	}
}

const getType = async () => {
	try {
		return await AsyncStorage.getItem('@App:userType')
	} catch (error) {
		return undefined
	}
}

const api = ApiClient()

export default function App() {
	const [token, setToken] = useState(undefined)
	const [userType, setUserType] = useState(undefined)
	const [profiles, setProfiles] = useState(undefined)
	const [showModalProfile, setShowModalProfile] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	// const { height } = useWindowDimensions()
	// const tempHeight = constHeight ? constHeight : height

	useEffect(() => {
		setIsLoading(true)
		getAuth().then((data) => {
			if (data) {
				setToken(data)
			}
		})
		getType().then((data) => {
			if (data) {
				setUserType(data)
			}
			setIsLoading(false)
		})
	}, [])

	async function doLogin(idProfile) {
		setIsLoading(true)
		const response = await api.post('/login/profile', {
			id: idProfile,
		})
		await AsyncStorage.removeItem('@App:token')
		await AsyncStorage.removeItem('@App:userType')
		setToken(undefined)
		setUserType(undefined)
		setProfiles(undefined)
		if (response?.data?.data?.token) {
			await AsyncStorage.setItem('@App:token', response.data.data.token)
			await AsyncStorage.setItem('@App:userType', response.data.data.user.type)
			setToken(response.data.data.token)
			setUserType(response.data.data.user.type)
		}
		setIsLoading(false)
	}

	if (isLoading) {
		return <SplashScreen />
	}

	function onPressChangeProfile(idProfile) {
		setShowModalProfile(false)
		doLogin(idProfile)
	}

	function onButtonModalClosePress() {
		setShowModalProfile(false)
	}

	return (
		// <SafeAreaView style={globalStyles.safeArea}>
		<View style={[{ height: constHeight }, StyleSheet.absoluteFill]}>
			<ProfileSwitchModal
				modalVisible={showModalProfile}
				onPressProfile={onPressChangeProfile}
				onPressClose={onButtonModalClosePress}
				profilesList={profiles}
			/>

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
							initialParams={{ setToken, setUserType, userType }}
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
							initialParams={{ setToken, setShowModalProfile, setUserType, userType, setProfiles }}
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
