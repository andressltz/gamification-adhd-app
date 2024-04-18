import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'
import { MessagesScreen } from '../../screens'
import { COLORS } from '../../assets'

const Stack = createStackNavigator()

export function MessagesStack() {
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
			<Stack.Screen component={MessagesScreen} name='MessagesScreen' options={{ title: 'Mensagens' }} />
		</Stack.Navigator>
	)
}
