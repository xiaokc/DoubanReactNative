/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import {Navigator} from 'react-native-deprecated-custom-components';
import MainView from './js/main/MainView';

export default class DoubanReactNative extends Component {
    render() {
        return (
            <Navigator
                initialRoute={{component:MainView}}
                renderScene={(route, navigator) => {
                return <route.component navigator={navigator} {...route.args}/>
                }
            }
            />
        );
    }
}

AppRegistry.registerComponent('DoubanReactNative', () => DoubanReactNative);
