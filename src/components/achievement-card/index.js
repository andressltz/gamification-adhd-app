import React from 'react'
import { Image, Text, View } from 'react-native'
import AntDesignIcon from 'react-native-vector-icons/dist/AntDesign'
import EntypoIcon from 'react-native-vector-icons/dist/Entypo'
import FontAwesomeIcon from 'react-native-vector-icons/dist/FontAwesome'
import { COLORS } from '../../assets'
import styles from './styles'

export function AchievementCard(props) {
	const { title = '', status = '', iconCode = 'ant_star_BLUE', id, alwaysEnabled = false, empty = false } = props

	const icon = splitIcon(iconCode)
	const iconSize = 45

	function splitIcon(iconCode) {
		if (iconCode) {
			const array = iconCode.trim().split('_')
			return { family: array[0], color: array[2], name: array[1], code: iconCode }
		}
		return { family: 'ant', color: 'BLUE', name: 'star', code: 'ant_star_BLUE' }
	}

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
			<View style={[styles.badge, { backgroundColor: COLORS[icon.color], opacity: isConquered() ? 1 : 0.5 }]}>
				{icon.family === 'ant' ? (
					<AntDesignIcon name={icon.name} size={iconSize} color={COLORS.WHITE} />
				) : icon.family === 'ent' ? (
					<EntypoIcon name={icon.name} size={iconSize} color={COLORS.WHITE} />
				) : (
					<FontAwesomeIcon name={icon.name} size={iconSize} color={COLORS.WHITE} />
				)}
			</View>
			<View style={styles.label}>
				<Text style={isConquered() ? styles.title : styles.titleDisable}>{title}</Text>
			</View>
		</View>
	)
}
