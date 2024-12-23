import { StyleSheet } from 'react-native'
import { COLORS } from '../../assets'

export default StyleSheet.create({
	container: {
		marginVertical: 10,
		marginHorizontal: 5,
		flex: 1,
		alignItems: 'center',
	},
	empty: {
		backgroundColor: 'transparent',
	},
	label: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	title: {
		fontSize: 16,
		textAlignVertical: 'center',
		textAlign: 'center',
		marginTop: 5,
	},
	titleDisable: {
		fontSize: 16,
		textAlignVertical: 'center',
		textAlign: 'center',
		marginTop: 5,
		color: COLORS.GREY_DARK,
	},
	badge: {
		height: 96,
		width: 96,
		backgroundColor: COLORS.BLUE,
		borderRadius: 50,
		alignItems: 'center',
		alignContent: 'center',
		margin: 5,
		justifyContent: 'center',
	},
})
