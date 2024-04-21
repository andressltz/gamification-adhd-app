import React, { useState, useEffect } from 'react'
import { View, SafeAreaView, Text, Image, FlatList, ActivityIndicator } from 'react-native'
import { FAB } from '@rneui/themed'

import styles from '../../styles'
import style from './styles'
import { ApiClient } from '../../services'
import { UserCard } from '../../components'
import { COLORS } from '../../assets'

const api = ApiClient()

export function ProfileScreen(props) {
	const { navigation } = props

	const [isLoading, setIsLoading] = useState(false)
	const [user, setUser] = useState({})

	useEffect(() => {
		async function getScreenData() {
			setIsLoading(true)
			const resp = await api.get('/user')
			setUser(resp.data.data)
			setIsLoading(false)
		}
		getScreenData()
	}, [props])

	function getUserType(type) {
		if (type === 'PARENT' || type === 1) {
			return 'Responsável'
		} else if (type === 'PATIENT' || type === 2) {
			return ''
		} else if (type === 'PROFESSIONAL' || type === 3) {
			return 'Profissional'
		} else {
			return ''
		}
	}

	function onButtonNewRelatedPatientPress() {
		navigation.navigate('NewPatientScreen', [])
	}

	function onButtonTasksPress(id, name) {
		navigation.navigate('TasksScreen', {patientId: id, patientName: name})
	}

	function renderContent() {
		if (isLoading) {
			return (
				<SafeAreaView style={styles.safeArea}>
					<View style={styles.loaderContainer}>
						<ActivityIndicator size='large' />
					</View>
				</SafeAreaView>
			)
		}

		return (
			<SafeAreaView style={styles.safeArea}>
				<View style={styles.container}>
					<Image resizeMode='cover' source={{ uri: user.image }} style={style.image} />
					<Text style={style.name}>{user.name}</Text>
					<Text style={style.userType}>{getUserType(user.type)}</Text>

					<FlatList
						numColumns={1}
						data={user.patients}
						renderItem={({ item }) => (
							<UserCard
								name={item.name}
								qtyStars={item.qtyStars}
								level={item.level}
								id={item.id}
								image={item.image}
								keyExtractor={item.id}
								onPress={() => onButtonTasksPress(item.id, item.name)}
							/>
						)}
					/>
					<FAB
						size='large'
						placement='right'
						onPress={() => onButtonNewRelatedPatientPress()}
						color={COLORS.GREEN_PRIM}
						icon={{
							name: 'add',
							color: 'white',
						}}
					/>
				</View>
			</SafeAreaView>
		)
	}

	return renderContent()
}
