/**
 * 热搜电影，即将上映的电影，数据来源于豆瓣api
 * Created by xiaokecong on 18/08/2017.
 */


import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    ListView,
    TouchableOpacity,
} from 'react-native';
import {Navigator} from 'react-native-deprecated-custom-components';
import MovieMessage from './MovieMessage';

const url = "https://api.douban.com/v2/movie/coming_soon";
var Dimensions = require('Dimensions');
var SCREEN_WIDTH = Dimensions.get('window').width;
var SCREEN_HEIGHT = Dimensions.get('window').height;

export default class MovieHotSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 != row2
            }),
        }
    }

    componentDidMount() {
        return this.fetchMovieData();
    }

    fetchMovieData() {
        fetch(url)
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(responseData.subjects),
                    isLoaded: true
                })
            })
            .catch((error) => {
                alert("获取热搜电影出错：\n" + error);
            })
            .done();
    }

    renderLoadingView() {
        return (
            <View style={styles.loading}>
                <Image
                    source={require('../image/loading.gif')}
                />
            </View>
        );
    }

    render() {
        if (!this.state.isLoaded) {
            return this.renderLoadingView();
        }
        return (
            <View style={styles.container}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderListViewItem.bind(this)}
                    contentContainerStyle={styles.listStyle}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}/>
            </View>
        );
    }

    renderListViewItem(movie) {
        return (
            <TouchableOpacity
                style={styles.itemViewStyle}
                activeOpacity={0.8}
                onPress={()=>this.onMovieItemClick(movie)}
            >
                <View style={styles.itemViewStyle}>
                    <Image source={{uri:movie.images.medium}} style={styles.itemIconStyle}/>
                    <Text numberOfLines={1} style={styles.itemTitleTxt}>{movie.title}</Text>
                    <Text numberOfLines={1} style={styles.itemScoreTxt}>{"评分：" + movie.rating.average}</Text>
                </View>


            </TouchableOpacity>
        );
    }

    onMovieItemClick = (movie) => {
        this.props.navigator.push({
            id: 'MovieMessage',
            args: {data: movie},
            component: MovieMessage,
            sceneConfig: Navigator.SceneConfigs.PushFromRight,

        });
    }
}

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff'
    },
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    listStyle: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    itemViewStyle: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: SCREEN_WIDTH / 3,
        height: 190,
        marginTop: 3,
        marginBottom: 3
    },
    itemIconStyle: {
        width: 110,
        height: 140
    },
    itemTitleTxt: {
        textAlign: 'center',
        fontWeight: 'bold',
        width: 80
    },
    itemScoreTxt: {
        textAlign: 'center',
        fontWeight: 'bold',
        width: 80
    }
});
