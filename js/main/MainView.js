/**
 * Created by xiaokecong on 18/08/2017.
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import {Navigator} from 'react-native-deprecated-custom-components';
import StartView from './StartView';
import HomePage from './HomePage';

export default class MainView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoad: false,
        };
    }

    showLoadingView() {
        return (
            <View style={styles.loading}>
                <StartView style={styles.startView}/>
            </View>
        )
    }

    render() {
        if (this.state.isLoad) {
            return this.showLoadingView();
        }
        return (
            <Navigator
                initialRoute={{component:HomePage}}
                renderScene={(route,navigator)=>{
                    return <route.component navigator={navigator}{...route.args}/>
               }}

                configureScene={(route)=>{
                    return Navigator.SceneConfigs.HorizontalSwipeJump;
                }}
            />

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
    startView: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#FFE439',
    },
    loading: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFE439',
    },
});