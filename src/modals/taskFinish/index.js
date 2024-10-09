import React from 'react'
import { Modal, Text, TouchableOpacity, View } from 'react-native'
import { StarRatingDisplay } from 'react-native-star-rating-widget'
import FontAwesomeIcon from 'react-native-vector-icons/dist/FontAwesome'
import { COLORS } from '../../assets'
import { AchievementCard } from '../../components'
import style from './styles'

export function TaskFinishModal(props) {
	const { task = {}, onPressBack = () => {}, onPressFinish = () => {}, modalTaskVisible } = props

	function renderModal() {
		return (
			<Modal
				animationType='slide'
				visible={modalTaskVisible}
				transparent={true}
				onRequestClose={() => {
					onPressBack()
				}}>
				<View style={style.modal}>
					<View style={style.modalContainer}>
						<View style={style.container}>
							<Text style={style.title}>Tarefa finalizada com sucesso!</Text>

							<Text style={style.achievementTitle}>BÔNUS CONQUISTADO</Text>

							<View style={style.achievementContainer}>
								<StarRatingDisplay
									rating={task.qtyStars}
									starSize={30}
									emptyColor={COLORS.GREY}
									color={COLORS.YELLOW}
									starStyle={{ marginHorizontal: 0 }}
								/>
							</View>

							{task.hasAchievement && task.achievement ? (
								<View style={style.achievementContainer}>
									<AchievementCard
										alwaysEnabled={true}
										iconCode={task.achievement.image}
										title={task.achievement.title}
										status={task.achievement.status}
										id={task.achievement.id}
										keyExtractor={task.achievement.id}
									/>
								</View>
							) : null}
						</View>

						<View style={style.actionContainer}>
							<TouchableOpacity activeOpacity={0.6} style={[style.actionButton, style.blueBorder]} onPress={() => onPressBack()}>
								<FontAwesomeIcon name='refresh' size={25} color={COLORS.BLUE} />
							</TouchableOpacity>

							<TouchableOpacity
								activeOpacity={0.6}
								style={[style.actionButton, style.greenBorder]}
								onPress={() => onPressFinish()}>
								<FontAwesomeIcon name='check' size={25} color={COLORS.GREEN_PRIM} />
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</Modal>
		)
	}

	return renderModal()
}
