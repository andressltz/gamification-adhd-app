import { StyleSheet } from 'react-native'
import { COLORS } from '../../assets'

export default StyleSheet.create({
	mainButton: {
		backgroundColor: COLORS.GREEN_BUTTON,
		height: 60,
		marginVertical: 10,
		borderRadius: 10,
		justifyContent: 'center',
		alignItems: 'center',
	},
	buttonText: {
		color: COLORS.WHITE,
		textTransform: 'capitalize',
		fontSize: 18,
		fontWeight: '600',
	},
})
