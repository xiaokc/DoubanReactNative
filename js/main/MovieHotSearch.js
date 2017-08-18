/**
 * 热搜电影，数据来源于豆瓣api
 * Created by xiaokecong on 18/08/2017.
 */



import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';
import {Navigator} from 'react-native-deprecated-custom-components';
import Icon from 'react-native-vector-icons/Ionicons';
import TabNavigator from 'react-native-tab-navigator';

export default class MovieHotSearch extends Component {
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
