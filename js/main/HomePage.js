/**
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

import MovieTab from './MovieTab';
import BookTab from './BookTab';
import MusicTab from './MusicTab';

export default class HomePage extends Component {
    static defaultProps = {
        selectedColor: 'rgb(22,131,251)',
        normalColor: '#a9a9a9',
    };

    constructor(props) {
        super(props);
        this.state = {
            selectedTab: '电影',
        };
    }

    componentWillMount() {
        const {selectedColor, normalColor} = this.props;
        Icon.getImageSource('md-videocam', 50, normalColor).then((source) => this.setState({videoNormal: source}));
        Icon.getImageSource('md-videocam', 50, selectedColor).then((source) => this.setState({videoSelected: source}));
        Icon.getImageSource('md-book', 50, normalColor).then((source) => this.setState({bookNormal: source}));
        Icon.getImageSource('md-book', 50, selectedColor).then((source) => this.setState({bookSelected: source}));
        Icon.getImageSource('md-musical-notes', 50, normalColor).then((source) => this.setState({musicNormal: source}));
        Icon.getImageSource('md-musical-notes', 50, selectedColor).then((source) => this.setState({musicSelected: source}));
    }

    render() {
        return (
            <TabNavigator tabBarStyle={styles.tabBar}>
                {this.renderTabItem('电影', this.state.videoNormal, this.state.videoSelected, this.createTabItem('电影'))}
                {this.renderTabItem('文学', this.state.bookNormal, this.state.bookSelected, this.createTabItem('文学'))}
                {this.renderTabItem('音乐', this.state.musicNormal, this.state.musicSelected, this.createTabItem('音乐'))}
            </TabNavigator>
        );
    }

    renderTabItem(tabTitle, tabIcon, tabSelectedIcon, tabView) {
        const {selectedColor} = this.props;
        return (
            <TabNavigator.Item
                selected={this.state.selectedTab === tabTitle}
                title={tabTitle}
                titleStyle={styles.tabText}
                selectedTitleStyle={{color:selectedColor}}
                renderIcon={() => <Image style={styles.icon} source={tabIcon} />}
                renderSelectedIcon={() => <Image style={styles.icon} source={tabSelectedIcon} />}
                onPress={() => this.setState({ selectedTab: tabTitle })}
            >
                {tabView}
            </TabNavigator.Item>
        );


    }

    createTabItem(tag) {
        switch (tag) {
            case "电影":
                return (<MovieTab navigator={this.props.navigator}/>);
                break;
            case "文学":
                return (<BookTab navigator={this.props.navigator}/>);
                break;
            case "音乐":
                return (<MusicTab navigator={this.props.navigator}/>);
                break;
            default:
                break;
        }


    }


}

const styles = StyleSheet.create({
    tabBar: {
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    tabText: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5
    },
    icon: {
        paddingTop: 5,
        width: 21,
        height: 21
    }
});