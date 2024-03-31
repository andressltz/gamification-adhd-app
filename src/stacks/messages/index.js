import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'
import { MessagesScreen } from '../../screens'

const Stack = createStackNavigator()

export function MessagesStack() {
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
			<Stack.Screen component={MessagesScreen} name='MessagesScreen' options={{ title: 'Mensagens' }} />
		</Stack.Navigator>
	)
}
