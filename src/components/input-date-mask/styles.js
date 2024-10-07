import { StyleSheet } from 'react-native'
import { COLORS } from '../../assets'

export default StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 10,
		padding: 5,
		flexWrap: 'nowrap',
	},
	mainInput: {
		backgroundColor: COLORS.WHITE,
		borderRadius: 10,
		fontWeight: '500',
		borderColor: COLORS.GREY,
		borderWidth: 1,
		marginTop: 2,
		paddingLeft: 5,
		paddingRight: 5,
		paddingVertical: 10,
	},
	label: {
		fontSize: 16,
		marginBottom: 5,
		flexWrap: 'wrap',
	},
	disabled: {
		color: COLORS.GREY,
	},
	enabled: {
		color: COLORS.BLACK,
	},
})
