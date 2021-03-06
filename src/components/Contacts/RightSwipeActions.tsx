import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';

interface Props {
    onDelete: () => void;
    onUpdate : () => void;
}

export const RightSwipeActions = ({ onDelete, onUpdate }: Props) => {

   
    return (
        <View
            style={styles.container}
        >
            <TouchableOpacity
             onPress={onUpdate}
                style={{
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Icon
                    name='edit'
                    size={30}
                    color={'#1cadec'}

                />
            </TouchableOpacity>
            <TouchableOpacity

                onPress={onDelete}
                style={{
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}

            >

                <Icon
                    name='delete'
                    size={30}
                    color={'red'}

                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 10,
        width: '30%',
        marginVertical: 10,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    }
});