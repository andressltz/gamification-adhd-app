import React from 'react'
import { Image, Text, View } from 'react-native'
import styles from './styles'

export function AchievementCard(props) {
	const { title = '', status = '', image = '', id, empty = false } = props

	function isConquered() {
		if (status === 'DO_NOT_CONQUERED') {
			return false
		} else if (status === 'CONQUERED') {
			return true
		}
		return false
	}

	if (empty) {
		return <View style={[styles.container, styles.empty]} />
	}

	return (
		<View style={styles.container}>
			<View style={{ height: 96 }}>
				<Image resizeMode='contain' source={{ uri: image }} style={{ flex: 1, opacity: isConquered() ? 1 : 0.5 }} />
			</View>
			<View style={styles.label}>
				<Text style={styles.title}>{title}</Text>
			</View>
		</View>
	)
}
