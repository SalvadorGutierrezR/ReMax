import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import ScrollBottomSheet from 'react-native-scroll-bottom-sheet';
import { useAppSelector } from '../../hooks';
import { Item } from '../../interfaces/locationsInterfaces';
import { ListItem } from './ListItem';
import { markers } from './Markers';

const windowHeight = Dimensions.get('window').height;

interface Props {
    onPressElement: (item: Item) => void;
}

export function BottomSheet({ onPressElement }: Props) {
    const { properties } = useAppSelector(state => state.properties);

    return (
        <ScrollBottomSheet
            componentType="FlatList"
            snapPoints={[100, '50%', windowHeight - 200]}
            initialSnapIndex={1}
            renderHandle={() => (
                <View style={styles.header}>
                    <View style={styles.panelHandle} />
                </View>
            )}
            data={properties}
            keyExtractor={(i) => (i.id).toString()}
            renderItem={({ item }) => (
                <ListItem item={item} onPressElement={onPressElement} />
            )}
            contentContainerStyle={styles.contentContainerStyle}
        />
    );
}

const styles = StyleSheet.create({
    contentContainerStyle: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        alignItems: 'center',
        backgroundColor: 'white',
        paddingVertical: 20,
    },
    panelHandle: {
        width: 41,
        height: 4,
        backgroundColor: '#E1E1E1',
        borderRadius: 17,
    },
});