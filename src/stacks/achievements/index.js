import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'
import { ArchivementsScreen } from '../../screens'

const Stack = createStackNavigator()

export function AchievementsStack() {
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
			<Stack.Screen component={ArchivementsScreen} name='ArchivementsScreen' options={{ title: 'Conquistas' }} />
		</Stack.Navigator>
	)
}
