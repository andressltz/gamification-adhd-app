import { createStackNavigator } from '@react-navigation/stack'
import React, { useEffect, useState } from 'react'
import { COLORS } from '../../assets'
import { LoginScreen, RegisterScreen } from '../../screens'

const Stack = createStackNavigator()

export function LoginStack(props) {
	const { navigation, route } = props
	const { setToken } = route.params
	const { setUserType } = route.params
	const [tokenStack, setTokenStack] = useState(undefined)
	const [userTypeStack, setUserTypeStack] = useState(undefined)

	useEffect(() => {
		if (tokenStack) {
			setToken(tokenStack)
		}
	}, [tokenStack])

	useEffect(() => {
		if (userTypeStack) {
			setUserType(userTypeStack)
		}
	}, [userTypeStack])

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
				initialParams={{ setTokenStack, setUserTypeStack }}
				component={LoginScreen}
				name='LoginScreen'
				options={{ title: 'Login' }}
			/>
			<Stack.Screen
				initialParams={{ setTokenStack, setUserTypeStack }}
				component={RegisterScreen}
				name='RegisterScreen'
				options={{ title: 'Cadastro' }}
			/>
		</Stack.Navigator>
	)
}
