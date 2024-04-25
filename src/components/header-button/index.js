import React from 'react'
import { TouchableOpacity } from 'react-native'
import FontAwesomeIcon from 'react-native-vector-icons/dist/FontAwesome'
import { COLORS } from '../../assets'
import styles from './styles'

export function HeaderButton(props) {
	const { icon = '', onPress = () => {} } = props

	return (
		<TouchableOpacity activeOpacity={0.6} onPress={() => onPress()}>
			<FontAwesomeIcon name={icon} size={18} color={COLORS.WHITE} style={styles.icon} />
		</TouchableOpacity>
	)
}
