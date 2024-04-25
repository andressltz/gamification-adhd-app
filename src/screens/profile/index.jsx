// import { FAB } from '@rneui/themed'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Image, SafeAreaView, Text, View } from 'react-native'
import EvilIconsIcon from 'react-native-vector-icons/dist/EvilIcons'
import FontAwesomeIcon from 'react-native-vector-icons/dist/FontAwesome'
import IoniconsIcon from 'react-native-vector-icons/dist/Ionicons'
import { COLORS } from '../../assets'
import { UserCard } from '../../components'
import { ApiClient } from '../../services'
import styles from '../../styles'
import style from './styles'

const api = ApiClient()

export function ProfileScreen(props) {
	const { navigation } = props

	const [isPatient, setisPatient] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [user, setUser] = useState({})

	useEffect(() => {
		async function getScreenData() {
			setIsLoading(true)
			await api.get('/user').then((response) => {
				setUser(response.data.data)
				setisPatient(response.data.data.type === 'PATIENT' || response.data.data.type === 1)
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

	function onButtonNewRelatedPatientPress() {
		navigation.navigate('NewPatientScreen', [])
	}

	function onButtonTasksPress(id, name) {
		navigation.navigate('TasksScreen', { patientId: id, patientName: name })
	}

	function renderContentPatient() {
		return (
			<SafeAreaView style={styles.safeArea}>
				<View style={styles.container}>
					<Image resizeMode='cover' source={{ uri: user.image }} style={style.image} />
					<Text style={style.name}>{user.name}</Text>
					<Text style={style.name}>Nível Mock</Text>
					<Text style={style.name}>Estrelas Mock</Text>

					<View style={style.detailContainer}>
						<View style={style.detailCard}>
							<View style={style.firstColumn}>
								<IoniconsIcon name='alarm-outline' size={35} color={COLORS.GREY_DARK} style={style.detailIcon} />
								<Text style={style.detailLabel}>TEMPO DE TAREFAS</Text>
							</View>
							<View style={style.secondColumn}>
								<Text style={style.detailLabel}>xx h</Text>
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
				</View>
			</SafeAreaView>
		)
	}

	function renderContentNotPatient() {
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
					{/* <FAB
						size='large'
						placement='right'
						visible={!isPatient}
						onPress={() => onButtonNewRelatedPatientPress()}
						color={COLORS.GREEN_PRIM}
						icon={{
							name: 'add',
							color: 'white',
						}}
					/> */}
				</View>
			</SafeAreaView>
		)
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

		return isPatient ? renderContentPatient() : renderContentNotPatient()
	}

	return renderContent()
}
