/**
 * 最佳影片，数据来源于豆瓣
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


const url = "https://api.douban.com/v2/movie/top250";
var ranking = 0;

export default class MovieBest extends Component {
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
        this.fetchMovieData();
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
                alert("获取最佳影片出错：\n" + error);
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
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderListItem.bind(this)}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            />

        );

    }


    renderListItem(movie) {
        ranking++;
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                style={styles.listItem}
                onPress={()=>this.onMovieItemClick(movie)}>

                <View style={styles.listItemBg}>
                    <View style={styles.rankBg}>
                        <Text style={styles.rankItemText}>{"Top " + ranking + ""}</Text>
                    </View>
                    <View style={styles.listItem}>
                        <Image
                            style={styles.moviePoster}
                            source={{uri:movie.images.medium}}/>
                        <View style={styles.movieItemView}>
                            <Text style={styles.movieItemTitle}>{movie.title}</Text>
                            <Text style={styles.movieItemTypeTxt}>{'类型：' + movie.rating.average}</Text>
                            <Text style={styles.movieItemScoreTxt}>{'评分：' + movie.genres}</Text>
                        </View>
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    listItem: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#ffffff'
    },
    listItemBg: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        marginTop: 2,
        marginBottom: 2,
        marginLeft: 3
    },
    rankBg: {
        backgroundColor: '#f1f1f1',
        justifyContent: 'center'
    },
    rankItemText: {
        fontSize: 17,
        marginTop: 10,
        marginLeft: 15
    },
    moviePoster: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        marginTop: 2,
        marginBottom: 2,
        marginLeft: 3
    },
    movieItemView: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        backgroundColor: '#ffffff',
        marginLeft: 10
    },
    movieItemTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'left'
    },
    movieItemTypeTxt: {
        fontSize: 17,
        marginTop: 10
    },
    movieItemScoreTxt: {
        fontSize: 17,
        marginTop: 10
    }

});
