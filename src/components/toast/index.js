import React from "react";

import {View, Text} from 'react-native'
import styles from "./styles";

export function Toast(props) {
	const {
		style = {},
		label = '',
		...otherProps
	} = props;

    return (
        <View style={styles.container}>
						<Text style={styles.label}>{label}</Text>
        </View>
    )
}
