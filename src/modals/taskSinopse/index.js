import React from 'react'
import { FlatList, Modal, Text, TouchableOpacity, View } from 'react-native'
import { StarRatingDisplay } from 'react-native-star-rating-widget'
import FontAwesomeIcon from 'react-native-vector-icons/dist/FontAwesome'
import { COLORS } from '../../assets'
import { AchievementCard } from '../../components'
import style from './styles'

export function TaskSinopseModal(props) {
	const { task = {}, onPressClose = () => {}, onPressStart = () => {}, modalTaskVisible } = props

	function renderModal() {
		return (
			<Modal
				animationType='slide'
				visible={modalTaskVisible}
				transparent={true}
				onRequestClose={() => {
					onPressClose()
				}}>
				<View style={style.modal}>
					<View style={style.modalContainer}>
						<View style={style.container}>
							<Text style={style.title}>Detalhes da tarefa</Text>
							<Text style={style.title}>({task.title})</Text>
							{task.timeToDo ? <Text style={style.duration}>Tempo proposto {task.timeToDoFormatted}</Text> : null}

							{task.steps ? (
								<View style={style.itemsContainer}>
									<Text style={style.description}>A tarefa é composta das seguintes etapas:</Text>
									<FlatList
										numColumns={1}
										data={task.steps}
										renderItem={({ item }) => <Text style={style.stepItem}>{item}</Text>}
									/>
								</View>
							) : null}

							{task.description ? (
								<View style={style.itemsContainer}>
									<Text style={style.description}>A tarefa é composta das seguintes etapas:</Text>
									<Text style={style.description}>- {task.description}</Text>
								</View>
							) : null}

							<Text style={style.achievementTitle}>Conquistas da Tarefa</Text>

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
										title={task.achievement.title}
										status={task.achievement.status}
										id={task.achievement.id}
										keyExtractor={task.achievement.id}
									/>
								</View>
							) : null}
						</View>
						<View style={style.actionContainer}>
							<TouchableOpacity activeOpacity={0.6} style={[style.actionButton, style.redBorder]} onPress={() => onPressClose()}>
								<FontAwesomeIcon name='remove' size={25} color={COLORS.RED} />
							</TouchableOpacity>

							<TouchableOpacity
								activeOpacity={0.6}
								style={[style.actionButton, style.yellowBorder]}
								onPress={() => onPressStart()}>
								<FontAwesomeIcon name='play' size={25} color={COLORS.YELLOW} />
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</Modal>
		)
	}

	return renderModal()
}
