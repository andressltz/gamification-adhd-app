import React from "react";

import {View, Text} from 'react-native'
import styles from "./styles";

export function ItemCard() {
    return (
        <View style={styles.itemCard}>
            <Text numberOfLines={1} style={styles.itemCardTitle}></Text>
        </View>
    )
}
