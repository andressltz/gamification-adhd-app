import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'
import { LoginScreen, RegisterScreen } from '../../screens'

const Stack = createStackNavigator()

export function LoginStack() {
	return (
		<Stack.Navigator
			screenOptions={{
				headerTitleAlign: 'left',
				headerTintColor: '#FFFFFF',
				headerStyle: {
					elevation: 0,
					shadowOpacity: 0,
					backgroundColor: '#008120',
				},
			}}>
			<Stack.Screen component={LoginScreen} name='LoginScreen' options={{ title: 'Login' }} />
			<Stack.Screen component={RegisterScreen} name='RegisterScreen' options={{ title: 'Cadastro' }} />
		</Stack.Navigator>
	)
}
