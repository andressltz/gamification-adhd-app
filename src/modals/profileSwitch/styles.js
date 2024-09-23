import { StyleSheet } from 'react-native'
import { COLORS } from '../../assets'

export default StyleSheet.create({
	modal: {
		flex: 1,
		justifyContent: 'center',
	},
	modalContainer: {
		backgroundColor: COLORS.WHITE,
		margin: 10,
		borderRadius: 20,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	container: {
		paddingHorizontal: 35,
		paddingBottom: 25,
		paddingTop: 15,
	},
	actionContainer: {
		paddingHorizontal: 20,
		paddingVertical: 15,
		justifyContent: 'center',
		flexDirection: 'row',
	},
	title: {
		textAlign: 'center',
		fontSize: 30,
		fontWeight: '600',
		marginBottom: 5,
	},
	profileItem: {
		justifyContent: 'space-between',
		flexDirection: 'row',
		marginVertical: 5,
		alignItems: 'center',
	},
	separator: {
		height: 1,
		backgroundColor: COLORS.GREY,
		marginVertical: 5,
	},
	listTitle: {
		marginTop: 10,
		textAlign: 'center',
		fontWeight: '600',
		marginBottom: 15,
	},
	stepItem: {
		// justifyContent: 'flex-start',
		fontSize: 16,
	},
	actionButton: {
		backgroundColor: COLORS.WHITE,
		height: 50,
		width: 50,
		borderRadius: 50,
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 3,
	},
	redBorder: {
		borderColor: COLORS.RED,
	},
	greenBorder: {
		borderColor: COLORS.GREEN_PRIM,
	},
})
