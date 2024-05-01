import { StyleSheet } from 'react-native'
import { COLORS } from '../../assets'

export default StyleSheet.create({
	card: {
		paddingTop: 5,
	},
	firstRow: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	secondRow: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	name: {
		marginHorizontal: 10,
		fontSize: 20,
		flex: 2,
	},
	separator: {
		height: 1,
		backgroundColor: COLORS.GREY,
		marginVertical: 5,
	},
	firstColumn: {
		flex: 0.2,
		marginHorizontal: 5,
	},
	secondColumn: {
		flex: 0.4,
		marginHorizontal: 5,
	},
	thirdColumn: {
		flex: 0.4,
		marginHorizontal: 5,
	},
})
