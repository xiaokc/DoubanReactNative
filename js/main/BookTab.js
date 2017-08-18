/**
 * Created by xiaokecong on 18/08/2017.
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
    Image,
} from 'react-native';
import {Navigator} from 'react-native-deprecated-custom-components';

export default class BookTab extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Image
                    source={require('../image/starting.gif')}
                />
            </View>
        );
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});