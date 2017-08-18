/** 显示豆瓣电影的tab
 * 分三个子tab：热搜电影/正在上映/最佳影片
 * 使用第三方scrollable-tab-view
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
import ScrollableTabView, {DefaultTabBar,} from 'react-native-scrollable-tab-view';

import MovieHotSearch from './MovieHotSearch'
import MovieOn from './MovieOn'
import MovieTop from './MovieBest'

export default class MovieTab extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <ScrollableTabView
                renderTabBar={()=><DefaultTabBar/>}
                tabBarUnderlineStyle={{backgroundColor:'#1683FB'}}
                tabBarActiveTextColor='#1683FB'
            >
                <MovieHotSearch tabLabel="热搜电影" navigator={this.props.navigator}/>
                <MovieOn tabLabel="正在上映" navigator={this.props.navigator}/>
                <MovieTop tabLabel="最佳影片" navigator={this.props.navigator}/>

            </ScrollableTabView>

        );
    }


}

