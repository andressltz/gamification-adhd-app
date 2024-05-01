import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'
import { AchievementsScreen, NewAchievementScreen } from '../../screens'
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
			<Stack.Screen component={AchievementsScreen} name='AchievementsScreen' options={{ title: 'Conquistas' }} initialParams={{}} />
			<Stack.Screen component={NewAchievementScreen} name='NewAchievementScreen' options={{ title: 'Nova Conquista' }} />
		</Stack.Navigator>
	)
}
