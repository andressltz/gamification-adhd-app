import React from 'react'
import { FlatList, Modal, Text, TouchableOpacity, View } from 'react-native'
import FontAwesomeIcon from 'react-native-vector-icons/dist/FontAwesome'
import { COLORS } from '../../assets'
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
							{task.timeToDo ? <Text style={style.duration}>Tempo proposto {task.timeToDo}</Text> : null}

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
								<Text>Estrelas mock</Text>
							</View>

							{task.hasAchievement ? (
								<View style={style.achievementContainer}>
									<Text>Conquistas mock</Text>
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
