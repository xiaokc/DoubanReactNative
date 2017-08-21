/**
 * Created by xiaokecong on 21/08/2017.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
    Image,
    BackHandler,
    WebView,
} from 'react-native';
import {Navigator} from 'react-native-deprecated-custom-components';

var Dimensions = require('Dimensions');
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class Detail extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this._back.bind(this));
    }

    _back() {
        if (this.props.navigator) {
            this.props.navigator.pop();
            return true;
        }

        return false;
    }

    render() {
        return (
            <View style={styles.container}>
                <WebView style={styles.webView}
                         source={{uri:this.props.data.alt, method:'GET'}}
                         javaScriptEnabled={true}
                         domStorageEnabled={true}
                         scalesPageToFit={true}
                         mediaPlaybackRequiresUserAction={true}
                         startInLoadingState={true}/>
            </View>
        );
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    webView: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        backgroundColor: '#E8E8E8'
    }
});