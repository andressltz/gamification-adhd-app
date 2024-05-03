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
		justifyContent: 'space-between',
		flexDirection: 'row',
	},
	itemsContainer: {
		marginTop: 10,
	},
	achievementContainer: {
		alignItems: 'center',
	},
	title: {
		textAlign: 'center',
		fontSize: 30,
		fontWeight: '600',
		marginBottom: 5,
	},
	duration: {
		textAlign: 'center',
		fontWeight: '500',
		marginBottom: 5,
	},
	achievementTitle: {
		marginTop: 20,
		textAlign: 'center',
		fontWeight: '600',
		marginBottom: 5,
	},
	description: {
		justifyContent: 'flex-start',
		fontSize: 14,
	},
	stepItem: {
		justifyContent: 'flex-start',
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
	blueBorder: {
		borderColor: COLORS.BLUE,
	},
	greenBorder: {
		borderColor: COLORS.GREEN_PRIM,
	},
})
