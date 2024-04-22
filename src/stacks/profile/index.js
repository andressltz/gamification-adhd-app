import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'
import { NewPatientScreen, ProfileScreen } from '../../screens'
import { COLORS } from '../../assets'
import { HeaderButton } from '../../components'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Stack = createStackNavigator()

export function ProfileStack(props) {
	const { navigation, route } = props
	const { setToken } = route.params


	const removeToken = async () => {
		await AsyncStorage.removeItem('@App:token')
		await AsyncStorage.removeItem('@App:userType')
		setToken(undefined)
	}

	function onPressLogout() {
		removeToken()
	}

	return (
		<Stack.Navigator
			screenOptions={{
				headerTitleAlign: 'left',
				headerTintColor: COLORS.WHITE,
				headerStyle: {
					elevation: 0,
					shadowOpacity: 0,
					backgroundColor: COLORS.GREEN_PRIM,
				},
				headerBackTitleVisible: false,
			}}>
			<Stack.Screen
				component={ProfileScreen}
				name='ProfileScreen'
				options={{ title: 'Perfil', headerRight: (props) => <HeaderButton icon='sign-out' onPress={onPressLogout} /> }}
			/>
			<Stack.Screen component={NewPatientScreen} name='NewPatientScreen' options={{ title: 'Vincular paciente' }} />
		</Stack.Navigator>
	)
}
