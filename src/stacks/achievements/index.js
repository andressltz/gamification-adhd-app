import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'
import { ArchivementsScreen } from '../../screens'
import { COLORS } from '../../assets'

const Stack = createStackNavigator()

export function AchievementsStack() {
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
			<Stack.Screen component={ArchivementsScreen} name='ArchivementsScreen' options={{ title: 'Conquistas' }} />
		</Stack.Navigator>
	)
}
