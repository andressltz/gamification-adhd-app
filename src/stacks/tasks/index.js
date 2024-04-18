import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'
import { TasksScreen, NewTaskScreen } from '../../screens'
import { COLORS } from '../../assets'

const Stack = createStackNavigator()

export function TasksStack() {
	return (
		<Stack.Navigator
			initialRouteName='TasksScreen'
			screenOptions={{
				headerTitleAlign: 'left',
				headerTintColor: COLORS.WHITE,
				headerStyle: {
					elevation: 0,
					shadowOpacity: 0,
					backgroundColor: COLORS.GREEN_PRIM,
				},
			}}>
			<Stack.Screen component={TasksScreen} name='TasksScreen' options={{ title: 'Tarefas' }} />
			<Stack.Screen component={NewTaskScreen} name='NewTaskScreen' options={{ title: 'Nova Tarefa' }} />
		</Stack.Navigator>
	)
}
