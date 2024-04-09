import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'
import { TasksScreen, NewTaskScreen } from '../../screens'

const Stack = createStackNavigator()

export function TasksStack() {
	return (
		<Stack.Navigator
			initialRouteName='TasksScreen'
			screenOptions={{
				headerTitleAlign: 'left',
				headerTintColor: '#FFFFFF',
				headerStyle: {
					elevation: 0,
					shadowOpacity: 0,
					backgroundColor: '#008120',
				},
			}}>
			<Stack.Screen component={TasksScreen} name='TasksScreen' options={{ title: 'Tarefas' }} />
			<Stack.Screen component={NewTaskScreen} name='NewTaskScreen' options={{ title: 'Nova Tarefa' }} />
		</Stack.Navigator>
	)
}
