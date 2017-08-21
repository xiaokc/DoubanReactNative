/** 正在上映，数据来源于豆瓣
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

const url = "https://api.douban.com/v2/movie/in_theaters";

export default class MovieOn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 != row2,
            }),
        };
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
                alert("获取正在上映的电影出错：\n" + error);
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
        var directors = '不详';
        for (var i = 0; i < movie.directors.length; i++) {
            if (i == 0) {
                directors = movie.directors[i].name;
            } else {
                directors += ',' + movie.directors[i].name;
            }
        }

        var casts = '';
        for (var j = 0; j < movie.casts.length; j++) {
            if (j == 0) {
                casts = movie.casts[0].name;
            } else {
                casts += ',' + movie.casts[j].name;
            }
        }

        return (
            <TouchableOpacity
                activeOpacity={0.8}
                style={styles.listitem}
                onPress={()=>{this.onMovieItemClick(movie)}}>
                <View style={styles.listItem}>
                    <Image style={styles.movieItemImage} source={{uri:movie.images.medium}}/>
                    <View style={styles.movieItemView}>
                        <Text style={styles.movieItemTitle}>{movie.title}</Text>
                        <Text style={styles.movieItemTxt}>{'评分:' + movie.rating.average}</Text>
                        <Text style={styles.movieItemTxt}>{'类型:' + movie.genres}</Text>
                        <Text style={styles.movieItemTxt}>{'导演:' + directors}</Text>
                        <Text style={styles.movieItemTxt}>{'演员:' + casts}</Text>
                    </View>
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
    listItem: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        marginTop: 2,
        marginBottom: 2,
        marginLeft: 3
    },
    movieItemImage: {
        width: 110,
        height: 150
    },
    movieItemView: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginLeft: 10
    },
    movieItemTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'left'
    },
    movieItemTxt: {
        fontSize: 17,
        marginTop: 5
    }

});
