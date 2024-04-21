import React, { useState, useEffect } from 'react'

import { createStackNavigator } from '@react-navigation/stack'
import { LoginScreen, RegisterScreen } from '../../screens'
import { COLORS } from '../../assets'

const Stack = createStackNavigator()

export function LoginStack(props) {
	const { navigation, route } = props
	const { setToken } = route.params
	const [tokenStack, setTokenStack] = useState(undefined)

	useEffect(() => {
		if (tokenStack) {
			setToken(tokenStack)
		}
	}, [tokenStack])

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
			<Stack.Screen initialParams={{ setTokenStack }} component={LoginScreen} name='LoginScreen' options={{ title: 'Login' }} />
			<Stack.Screen
				initialParams={{ setTokenStack }}
				component={RegisterScreen}
				name='RegisterScreen'
				options={{ title: 'Cadastro' }}
			/>
		</Stack.Navigator>
	)
}
