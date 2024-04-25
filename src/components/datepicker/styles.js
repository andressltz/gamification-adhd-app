import { StyleSheet } from 'react-native'

import { COLORS } from '../../assets'

export default StyleSheet.create({
	container: {
		padding: 5,
		flexWrap: 'wrap',
	},
	label: {
		fontSize: 16,
		flexWrap: 'wrap',
	},
	input: {
		color: COLORS.GREY,
		borderRadius: 10,
		fontWeight: '600',
		borderColor: COLORS.GREY,
		borderWidth: 1,
		marginTop: 2,
		paddingLeft: 5,
		paddingRight: 5,
	},
})
