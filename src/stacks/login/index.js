import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'
import { LoginScreen, RegisterScreen } from '../../screens'
import { COLORS } from '../../assets'

const Stack = createStackNavigator()

export function LoginStack() {
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
			}}>
			<Stack.Screen component={LoginScreen} name='LoginScreen' options={{ title: 'Login' }} />
			<Stack.Screen component={RegisterScreen} name='RegisterScreen' options={{ title: 'Cadastro' }} />
		</Stack.Navigator>
	)
}
