import { StyleSheet } from 'react-native'
import { COLORS } from '../../assets'

export default StyleSheet.create({
	mainInput: {
		backgroundColor: COLORS.WHITE,
		height: 60,
		paddingHorizontal: 20,
		borderRadius: 10,
		fontSize: 18,
		fontWeight: '600',
		borderColor: COLORS.GREY,
		borderWidth: 1,
		marginTop: 2,
		marginBottom: 10,
	},
	label: {
		fontSize: 18,
		marginBottom: 5,
	},
	disabled: {
		color: COLORS.GREY,
	},
	enabled: {
		color: COLORS.BLACK,
	},
})
