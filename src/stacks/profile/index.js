import AsyncStorage from '@react-native-async-storage/async-storage'
import { createStackNavigator } from '@react-navigation/stack'
import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { COLORS } from '../../assets'
import { HeaderButton } from '../../components'
import { NewPatientScreen, ProfileScreen, RegisterPatientScreen } from '../../screens'

const Stack = createStackNavigator()

export function ProfileStack(props) {
	const { navigation, route } = props
	const { setToken } = route.params
	const { setProfiles } = route.params
	const { setShowModalProfile } = route.params
	const { setUserType, userType } = route.params
	const [profilesStack, setProfilesStack] = useState(undefined)

	useEffect(() => {
		if (profilesStack) {
			setProfiles(profilesStack)
		}
	}, [profilesStack])

	const removeToken = async () => {
		await AsyncStorage.removeItem('@App:token')
		await AsyncStorage.removeItem('@App:userType')
		setToken(undefined)
		setUserType(undefined)
	}

	function onPressLogout() {
		removeToken()
	}

	function onPressChangeProfile() {
		setShowModalProfile(true)
	}

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
				initialParams={{ setProfilesStack }}
				component={ProfileScreen}
				name='ProfileScreen'
				options={{
					title: 'Perfil',
					headerRight: (props) => (
						<View style={{ flexDirection: 'row' }}>
							{userType && userType !== 'PATIENT' ? <HeaderButton icon='id-badge' onPress={onPressChangeProfile} /> : null}
							<HeaderButton icon='sign-out' onPress={onPressLogout} />
						</View>
					),
				}}
			/>
			<Stack.Screen component={NewPatientScreen} name='NewPatientScreen' options={{ title: 'Vincular paciente' }} />
			<Stack.Screen component={RegisterPatientScreen} name='RegisterPatientScreen' options={{ title: 'Cadastro de Paciente' }} />
		</Stack.Navigator>
	)
}
