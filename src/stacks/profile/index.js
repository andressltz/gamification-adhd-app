import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'
import { NewPatientScreen, ProfileScreen } from '../../screens'
import { COLORS } from '../../assets'
import { HeaderButton } from '../../components'
import { Alert } from 'react-native'

const Stack = createStackNavigator()

export function ProfileStack() {
	function onPressLogout() {
		Alert.alert('sair')
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
