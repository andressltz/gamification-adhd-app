import AsyncStorage from '@react-native-async-storage/async-storage'
import { FAB } from '@rneui/themed'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { ActivityIndicator, FlatList, View } from 'react-native'
import { COLORS } from '../../assets'
import { AchievementCard, EmptyList, Toast } from '../../components'
import { ApiClient } from '../../services'
import globalStyles from '../../styles'

const api = ApiClient()

export function AchievementsScreen(props) {
	const { navigation, route } = props
	const { patientId, patientName } = route.params
	const [isPatient, setIsPatient] = useState(false)

	const [hasError, setHasError] = useState(false)
	const [errorMessage, setErrorMessage] = useState(undefined)
	const [isLoading, setIsLoading] = useState(false)

	const [achievements, setAchievements] = useState([])

	const emptyMsg = 'Nenhuma conquista cadastrada.'
	const emptyMsgAdd = 'Para cadastrar, selecione um paciente em Perfil.'

	useEffect(() => {
		getStorageUserType().then((userType) => {
			if (userType === 'PATIENT') {
				setIsPatient(true)
			} else {
				setIsPatient(false)
			}
		})
	}, [props])

	useLayoutEffect(() => {
		if (isPatient) {
			navigation.setOptions({ title: `Minhas conquistas` })
		} else if (patientName) {
			navigation.setOptions({ title: `Conquistas de ${patientName}` })
		}
	}, [props])

	useEffect(() => {
		async function getScreenData() {
			setIsLoading(true)
			if (patientId) {
				const response = await api.get(`/achievement/user/${patientId}`)
				if (response?.data?.data) {
					setAchievements(response.data.data)
					setHasError(false)
				} else {
					setHasError(true)
					setErrorMessage(response)
				}
			} else {
				const response = await api.get('/achievement')
				if (response?.data?.data) {
					setAchievements(response.data.data)
					setHasError(false)
				} else {
					setHasError(true)
					setErrorMessage(response)
				}
			}
			setIsLoading(false)
		}
		getScreenData()
	}, [props])

	function onButtonNewAchievementPress() {
		navigation.navigate('NewAchievementScreen', { patientId, patientName })
	}

	const getStorageUserType = async () => {
		return await AsyncStorage.getItem('@App:userType')
	}

	function formatData(data, numColumns) {
		const emptyQty = numColumns - (data.length % numColumns)
		for (let id = 0; id < emptyQty; id++) {
			data.push({ id: `blank-${id}`, empty: true })
		}
		return data
	}

	function renderContent() {
		if (isLoading) {
			return (
				<View style={globalStyles.loaderContainer}>
					<ActivityIndicator size='large' />
				</View>
			)
		}

		return (
			<View style={[globalStyles.container, { paddingLeft: 1, paddingRight: 1 }]}>
				{hasError ? <Toast label={errorMessage} /> : null}

				<FlatList
					numColumns={3}
					data={formatData(achievements, 3)}
					ListEmptyComponent={() => <EmptyList canAdd={!isPatient} msg={emptyMsg} msgAdd={emptyMsgAdd} />}
					renderItem={({ item }) => (
						<AchievementCard title={item.title} status={item.status} id={item.id} empty={item.empty} keyExtractor={item.id} />
					)}
				/>
				<FAB
					size='large'
					placement='right'
					visible={!isPatient && patientId ? true : false}
					onPress={() => onButtonNewAchievementPress()}
					color={COLORS.GREEN_PRIM}
					icon={{
						name: 'add',
						color: 'white',
					}}
				/>
			</View>
		)
	}

	return renderContent()
}
