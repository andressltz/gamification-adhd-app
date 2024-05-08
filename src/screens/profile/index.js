import { FAB } from '@rneui/themed'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Image, ScrollView, Text, View } from 'react-native'
import EvilIconsIcon from 'react-native-vector-icons/dist/EvilIcons'
import FontAwesomeIcon from 'react-native-vector-icons/dist/FontAwesome'
import IoniconsIcon from 'react-native-vector-icons/dist/Ionicons'
import { COLORS } from '../../assets'
import { Toast, UserCard } from '../../components'
import { ApiClient } from '../../services'
import globalStyles from '../../styles'
import style from './styles'

const api = ApiClient()

export function ProfileScreen(props) {
	const { navigation, route } = props

	const [isPatient, setisPatient] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	const [hasError, setHasError] = useState(false)
	const [errorMessage, setErrorMessage] = useState(undefined)

	const [user, setUser] = useState({})

	useEffect(() => {
		async function getScreenData() {
			setIsLoading(true)
			await api.get('/user').then((response) => {
				if (response?.data?.data) {
					setUser(response.data.data)
					setisPatient(response.data.data.type === 'PATIENT' || response.data.data.type === 1)
					setHasError(false)
				} else {
					setHasError(true)
					setErrorMessage(response)
				}
				setIsLoading(false)
			})
		}
		getScreenData()
	}, [props])

	function getUserType(type) {
		if (type === 'PARENT' || type === 0) {
			return 'Responsável'
		} else if (type === 'PATIENT' || type === 1) {
			return ''
		} else if (type === 'PROFESSIONAL' || type === 2) {
			return 'Profissional'
		} else {
			return ''
		}
	}

	function getUserImageType(type, gender) {
		if (type === 'PARENT' || type === 0) {
			if (gender && gender === 'FEMALE') {
				return '/avatar/resp_f.png'
			}
			return '/avatar/resp_m.png'
		} else if (type === 'PATIENT' || type === 1) {
			return undefined
		} else if (type === 'PROFESSIONAL' || type === 2) {
			if (gender && gender === 'FEMALE') {
				return '/avatar/doctor_f.png'
			}
			return '/avatar/doctor_m.png'
		} else {
			return undefined
		}
	}

	function onButtonNewRelatedPatientPress() {
		navigation.navigate('NewPatientScreen', [])
	}

	function onButtonTasksPress(id, name) {
		navigation.navigate('TasksScreen', { patientId: id, patientName: name })
	}

	function onButtonAchievementPress(id, name) {
		navigation.navigate('AchievementsScreen', { patientId: id, patientName: name })
	}

	function renderContentPatient() {
		return (
			<View style={globalStyles.containerScroll}>
				<ScrollView style={globalStyles.scrollview}>
					{hasError ? <Toast label={errorMessage} /> : null}
					<View style={{ height: 110 }}>
						{user.gender && user.gender === 'FEMALE' ? (
							<Image
								resizeMode='contain'
								source={{ uri: `https://avatar.iran.liara.run/public/girl?username=${user.name}` }}
								style={{ flex: 1 }}
							/>
						) : (
							<Image
								resizeMode='contain'
								source={{ uri: `https://avatar.iran.liara.run/public/boy?username=${user.name}` }}
								style={{ flex: 1 }}
							/>
						)}
					</View>
					<Text style={style.name}>{user.name}</Text>
					<Text style={style.achievement}>Nível: {user.level}/30</Text>
					<Text style={style.achievement}>Estrelas: {user.qtyStars}</Text>
					<View style={style.detailContainer}>
						<View style={style.detailCard}>
							<View style={style.firstColumn}>
								<IoniconsIcon name='alarm-outline' size={35} color={COLORS.GREY_DARK} style={style.detailIcon} />
								<Text style={style.detailLabel}>TEMPO DE TAREFAS</Text>
							</View>
							<View style={style.secondColumn}>
								<Text style={style.detailLabel}>{user.totalDurationFormatted}</Text>
							</View>
						</View>
						<View style={style.separator} />
						<View style={style.detailCard}>
							<FontAwesomeIcon name='phone' size={35} color={COLORS.GREY_DARK} style={style.detailIcon} />
							<Text style={style.detailLabel}>{user.phoneFormated}</Text>
						</View>
						<View style={style.separator} />
						<View style={style.detailCard}>
							<EvilIconsIcon name='envelope' size={35} color={COLORS.GREY_DARK} style={style.detailIcon} />
							<Text style={style.detailLabel}>{user.email}</Text>
						</View>
						<View style={style.separator} />
					</View>
				</ScrollView>
			</View>
		)
	}

	function renderContentNotPatient() {
		return (
			<View style={[globalStyles.container, { paddingLeft: 5, paddingRight: 5 }]}>
				{hasError ? <Toast label={errorMessage} /> : null}

				<View style={{ height: 110 }}>
					<Image resizeMode='contain' source={{ uri: getUserImageType(user.type, user.gender) }} style={{ flex: 1 }} />
				</View>
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
							gender={item.gender}
							keyExtractor={item.id}
							onPressTask={() => onButtonTasksPress(item.id, item.name)}
							onPressAchievement={() => onButtonAchievementPress(item.id, item.name)}
						/>
					)}
				/>
				<FAB
					size='large'
					placement='right'
					visible={!isPatient}
					onPress={() => onButtonNewRelatedPatientPress()}
					color={COLORS.GREEN_PRIM}
					icon={{
						name: 'add',
						color: 'white',
					}}
				/>
			</View>
		)
	}

	function renderContent() {
		if (isLoading) {
			return (
				<View style={globalStyles.loaderContainer}>
					<ActivityIndicator size='large' />
				</View>
			)
		}

		return isPatient ? renderContentPatient() : renderContentNotPatient()
	}

	return renderContent()
}
