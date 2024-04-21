import React from 'react'

import { TouchableOpacity, Text } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import styles from './styles'
import { COLORS } from '../../assets'

export function HeaderButton(props) {
	const { icon = '', onPress = () => {} } = props

	return (
		<TouchableOpacity activeOpacity={0.6} onPress={() => onPress()}>
			<Icon name={icon} size={18} color={COLORS.WHITE} style={styles.icon} />
		</TouchableOpacity>
	)
}
