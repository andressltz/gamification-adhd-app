import { StyleSheet } from 'react-native'
import { COLORS } from '../../assets'

export default StyleSheet.create({
	card: {
		paddingTop: 2,
	},
	firstRow: {
		paddingLeft: 10,
		paddingRight: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	secondRow: {
		paddingRight: 10,
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
})
