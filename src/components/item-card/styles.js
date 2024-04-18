import { StyleSheet } from 'react-native'
import { COLORS } from '../../assets'

export default StyleSheet.create({
	card: {
		paddingTop: 2,
	},
	firstLine: {
		paddingLeft: 10,
		paddingRight: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	secondLine: {
		paddingRight: 10,
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	thirdLine: {
		paddingLeft: 10,
		paddingRight: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	title: {
		marginHorizontal: 10,
		fontSize: 16,
		fontWeight: 'bold',
		flex: 2,
	},
	separator: {
		height: 1,
		backgroundColor: COLORS.GREY,
		marginVertical: 5,
	},
	date: {
		flexDirection: 'row',
	},
	dateText: {
		fontSize: 12,
		color: COLORS.GREY,
		textAlign: 'left',
		paddingLeft: 5,
		fontWeight: '500',
	},
	duration: {
		fontSize: 12,
		color: COLORS.GREY,
		textAlign: 'right',
	},
})
