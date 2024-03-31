import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'
import { ProfileScreen } from '../../screens'

const Stack = createStackNavigator()

export function ProfileStack() {
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
			<Stack.Screen component={ProfileScreen} name='ProfileScreen' options={{ title: 'Perfil' }} />
		</Stack.Navigator>
	)
}
