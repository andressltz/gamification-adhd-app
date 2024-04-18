import { StyleSheet } from 'react-native'
import { COLORS } from '../../assets'

export default StyleSheet.create({
	container: {
		backgroundColor: COLORS.RED,
		borderRadius: 10,
		padding: 20,
		flexDirection: 'row',
		alignItems: 'flex-start',
		marginVertical: 5,
		marginBottom: 10,
	},
	label: {
		flex: 1,
		fontSize: 16,
		color: COLORS.WHITE,
	},
})
