import { StyleSheet } from 'react-native'
import { COLORS } from '../../assets'

export default StyleSheet.create({
	label: {
		fontSize: 18,
		marginBottom: 5,
	},
	board: {
		backgroundColor: COLORS.WHITE,
		padding: 15,
		borderRadius: 10,
		fontSize: 18,
		fontWeight: '600',
		borderColor: COLORS.GREY,
		borderWidth: 1,
		marginTop: 2,
		marginBottom: 10,
		alignItems: 'center',
		alignContent: 'center',
		justifyContent: 'center',
	},
	badgeView: {
		height: 72,
		width: 72,
		backgroundColor: COLORS.BLUE,
		borderRadius: 50,
		alignItems: 'center',
		alignContent: 'center',
		margin: 5,
		justifyContent: 'center',
		flex: 1,
	},
	selectedIcon: {
		height: 72,
		width: 72,
		backgroundColor: COLORS.BLUE,
		borderRadius: 50,
		alignItems: 'center',
		alignContent: 'center',
		margin: 5,
		justifyContent: 'center',
	},
	empty: {
		backgroundColor: 'transparent',
	},
	colorView: {
		height: 72,
		width: 72,
		borderRadius: 50,
		alignItems: 'center',
		alignContent: 'center',
		padding: 30,
		justifyContent: 'center',
		flex: 1,
	},
})
