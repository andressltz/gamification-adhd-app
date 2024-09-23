import { StyleSheet } from 'react-native'
import { COLORS } from '../../assets'

export default StyleSheet.create({
	containerError: {
		backgroundColor: COLORS.RED,
		borderRadius: 10,
		padding: 20,
		alignItems: 'flex-start',
		marginVertical: 5,
		marginBottom: 10,
		marginHorizontal: 5,
	},
	containerInfo: {
		backgroundColor: COLORS.BLUE_SEC,
		borderRadius: 10,
		padding: 20,
		alignItems: 'flex-start',
		marginVertical: 5,
		marginBottom: 10,
		marginHorizontal: 5,
	},
	label: {
		flex: 1,
		fontSize: 16,
		color: COLORS.WHITE,
	},
	title: {
		flex: 1,
		fontSize: 16,
		color: COLORS.WHITE,
		fontWeight: 'bold',
		marginBottom: 5,
	},
})
