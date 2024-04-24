import { StyleSheet } from 'react-native'
import { COLORS } from '../../assets'

export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.WHITE,
		margin: 15,
		justifyContent: 'center',
		alignItems: 'center',
	},
	containerScroll: {
		flex: 1,
		backgroundColor: COLORS.WHITE,
	},
	scrollview: {
		paddingLeft: 15,
		paddingRight: 15,
		paddingTop: 10,
		paddingBottom: 10,
	},
	safeArea: {
		flex: 1,
		backgroundColor: COLORS.WHITE,
	},
	loaderContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	itemsContainer: {
		borderColor: COLORS.BLACK,
		borderWidth: 1,
		padding: 10,
		marginTop: 10,
	},
	title: {
		textAlign: 'center',
		fontSize: 30,
		fontWeight: 'bold',
		marginTop: 10,
		marginBottom: 10,
	},
	description: {
		justifyContent: 'flex-start',
		fontSize: 16,
	},
	actions: {
		marginTop: 10,
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
	},
	actionButton: {
		backgroundColor: COLORS.WHITE,
		height: 50,
		width: 50,
		borderRadius: 50,
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 3,
		marginLeft: 10,
	},
	blueBorder: {
		borderColor: COLORS.BLUE,
	},
	redBorder: {
		borderColor: COLORS.RED,
	},
	greenBorder: {
		borderColor: COLORS.GREEN_PRIM,
	},
	clockContainer: {
		borderColor: COLORS.BLACK,
		borderWidth: 3,
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
		paddingVertical: 10,
		paddingHorizontal: 20,
	},
})
