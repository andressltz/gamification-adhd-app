import { StyleSheet } from 'react-native'

export default StyleSheet.create({
	container: {},
	firstRow: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 10,
	},
	secondRow: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 10,
	},
	firstColumn: {
		flex: 0.1,
		marginRight: 5,
	},
	secondColumn: {
		flex: 0.9,
		marginLeft: 5,
	},
	achievement: {
		textAlign: 'center',
		fontSize: 15,
		fontWeight: 'bold',
		paddingBottom: 3,
	},
})
