import React from 'react'
import { Image, Text, View } from 'react-native'
import styles from './styles'

export function AchievementCard(props) {
	const { title = '', status = '', image = '', id, alwaysEnabled = false, empty = false } = props

	function isConquered() {
		if (alwaysEnabled) {
			return true
		} else {
			if (status === 'DO_NOT_CONQUERED') {
				return false
			} else if (status === 'CONQUERED') {
				return true
			}
			return false
		}
	}

	if (empty) {
		return <View style={[styles.container, styles.empty]} />
	}

	return (
		<View style={styles.container}>
			<View style={{ height: 96, width: 96 }}>
				<Image
					resizeMode='contain'
					source={{ uri: `https://avatar.iran.liara.run/username?username=${title}&size=96` }}
					style={{ flex: 1, opacity: isConquered() ? 1 : 0.5 }}
				/>
			</View>
			<View style={styles.label}>
				<Text style={isConquered() ? styles.title : styles.titleDisable}>{title}</Text>
			</View>
		</View>
	)
}
