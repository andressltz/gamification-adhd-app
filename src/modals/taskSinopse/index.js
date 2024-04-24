import React, { useState } from 'react'
import { View, SafeAreaView, FlatList, Text, TouchableOpacity, Modal } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import styles from '../../styles'
import style from './styles'
import { COLORS } from '../../assets'

export function TaskSinopseModal(props) {
	const { visible = false, task = {}, onPressClose = () => {} } = props
	// const [selectedTask, setSelectedTask] = useState(task)
	// const [visibleModal, setVisibleModal] = useState(visible)

	function renderModal() {
		return (
			<Modal
				animationType='slide'
				visible={visible}
				transparent={true}
				onRequestClose={() => {
					Alert.alert('Modal has been closed.')
					setModalVisible(false)
				}}
				>
				<SafeAreaView style={styles.safeArea}>
					<View style={styles.container}>
						<Text style={style.title}>{task.title}</Text>

						{task.steps ? (
							<View style={style.itemsContainer}>
								<FlatList
									numColumns={1}
									data={task.steps}
									renderItem={({ item }) => <Text style={style.stepItem}>{item}</Text>}
								/>
							</View>
						) : null}

						{task.description ? (
							<View style={style.itemsContainer}>
								<Text style={style.description}>{task.description}</Text>
							</View>
						) : null}

						<TouchableOpacity
							activeOpacity={0.6}
							style={[style.actionButton, style.blueBorder]}
							onPress={() => onPressClose()}
							// onPress={() => {
							// 	setModalVisible(!modalVisible)
							// }}>
							>
							<Icon name='pause' size={25} color={COLORS.BLUE} />
						</TouchableOpacity>
					</View>
				</SafeAreaView>
			</Modal>
		)
	}

	return renderModal()
}
