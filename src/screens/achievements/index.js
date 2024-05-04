import AsyncStorage from '@react-native-async-storage/async-storage'
import { useIsFocused } from '@react-navigation/native'
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
	const isFocused = useIsFocused()

	const [achievements, setAchievements] = useState([])
	const [achievementsFormated, setAchievementsFormated] = useState([])

	const emptyMsg = 'Nenhuma conquista cadastrada.'
	const emptyMsgSelect = 'Para cadastrar, selecione um paciente em Perfil.'
	const emptyMsgAdd = 'Para cadastrar, clique no botão + .'

	useEffect(() => {
		getStorageUserType().then((userType) => {
			if (userType === 'PATIENT') {
				setIsPatient(true)
			} else {
				setIsPatient(false)
			}
		})
	}, [props])

	useEffect(() => {
		async function getScreenData() {
			setIsLoading(true)
			if (patientId) {
				const response = await api.get(`/achievement/user/${patientId}`)
				if (response?.data?.data) {
					setAchievements(response.data.data)
					setAchievementsFormated(formatData(response.data.data, 3))
					setHasError(false)
				} else {
					setHasError(true)
					setErrorMessage(response)
				}
			} else {
				const response = await api.get('/achievement')
				if (response?.data?.data) {
					setAchievements(response.data.data)
					setAchievementsFormated(formatData(response.data.data, 3))
					setHasError(false)
				} else {
					setHasError(true)
					setErrorMessage(response)
				}
			}
			setIsLoading(false)
		}
		getScreenData()
	}, [isFocused])

	useLayoutEffect(() => {
		if (isPatient) {
			navigation.setOptions({ title: `Minhas conquistas` })
		} else if (patientName) {
			navigation.setOptions({ title: `Conquistas de ${patientName}` })
		}
	}, [props])

	function onButtonNewAchievementPress() {
		navigation.navigate('NewAchievementScreen', { patientId, patientName })
	}

	const getStorageUserType = async () => {
		return await AsyncStorage.getItem('@App:userType')
	}

	function formatData(data, numColumns) {
		if (data.length > 0) {
			const emptyQty = numColumns - (data.length % numColumns)
			for (let id = 0; id < emptyQty; id++) {
				data.push({ id: `blank-${id}`, empty: true })
			}
			return data
		}
		return []
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
					data={achievementsFormated}
					ListEmptyComponent={() => <EmptyList canAdd={!isPatient} msg={emptyMsg} msgAdd={patientId ? emptyMsgAdd : emptyMsgSelect} />}
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
