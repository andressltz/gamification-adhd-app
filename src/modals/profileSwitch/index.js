import React from 'react'
import { FlatList, Modal, Text, TouchableOpacity, View } from 'react-native'
import { StarRatingDisplay } from 'react-native-star-rating-widget'
import FontAwesomeIcon from 'react-native-vector-icons/dist/FontAwesome'
import { COLORS } from '../../assets'
import { EmptyList } from '../../components'
import style from './styles'

export function ProfileSwitchModal(props) {
	const { profilesList = [], onPressClose = () => {}, onPressProfile = () => {}, modalVisible } = props

	function renderModal() {
		return (
			<Modal
				animationType='slide'
				visible={modalVisible}
				transparent={true}
				onRequestClose={() => {
					onPressClose()
				}}>
				<View style={style.modal}>
					<View style={style.modalContainer}>
						<View style={style.container}>
							<Text style={style.title}>Pacientes</Text>

							<Text style={style.listTitle}>Selecione um paciente para realizar login:</Text>

							<FlatList
								numColumns={1}
								data={profilesList}
								ListEmptyComponent={() => <EmptyList canAdd={false} msg={'Sem pacientes relacionados.'} />}
								renderItem={({ item }) => (
									<View>
										<View style={style.profileItem}>
											<Text style={style.stepItem}>
												{item.name} - {item.id}
											</Text>
											<TouchableOpacity
												activeOpacity={0.6}
												style={[style.actionButton, style.greenBorder]}
												onPress={() => onPressProfile(item.id)}>
												<FontAwesomeIcon name='sign-in' size={25} color={COLORS.GREEN_PRIM} />
											</TouchableOpacity>
										</View>
										<View style={style.separator} />
									</View>
								)}
							/>
						</View>

						<View style={style.actionContainer}>
							<TouchableOpacity activeOpacity={0.6} style={[style.actionButton, style.redBorder]} onPress={() => onPressClose()}>
								<FontAwesomeIcon name='remove' size={25} color={COLORS.RED} />
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</Modal>
		)
	}

	return renderModal()
}
