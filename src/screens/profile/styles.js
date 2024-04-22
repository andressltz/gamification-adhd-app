import { StyleSheet } from 'react-native'
import { COLORS } from '../../assets'

export default StyleSheet.create({
	name: {
		textAlign: 'center',
		fontSize: 30,
		fontWeight: 'bold',
	},
	userType: {
		textAlign: 'center',
		fontSize: 20,
		color: COLORS.GREY_DARK,
		marginBottom: 30,
	},
	separator: {
		height: 1,
		backgroundColor: COLORS.GREY,
		marginVertical: 5,
	},
	detailContainer: {
		paddingTop: 15,
	},
	detailCard: {
		flexDirection: 'row',
		paddingTop: 10,
		paddingBottom: 10,
		alignItems: 'center',
	},
	detailLabel: {
		fontSize: 20,
		marginLeft: 20,
	},
	detailIcon: {},
	firstColumn: {
		flexDirection: 'row',
		alignItems: 'center',
		flex: 1,
	},
	secondColumn: {
		alignItems: 'center',
		textAlign: 'right',
		alignContent: 'flex-end',
	},
})
