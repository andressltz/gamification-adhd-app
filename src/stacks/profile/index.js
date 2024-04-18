import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'
import { ProfileScreen } from '../../screens'
import { COLORS } from '../../assets'

const Stack = createStackNavigator()

export function ProfileStack() {
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
			<Stack.Screen component={ProfileScreen} name='ProfileScreen' options={{ title: 'Perfil' }} />
		</Stack.Navigator>
	)
}
