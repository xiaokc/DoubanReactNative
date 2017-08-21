/**
 * Created by xiaokecong on 18/08/2017.
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
    Image,
    ListView,
    TouchableOpacity,
    Text
} from 'react-native';
import {Navigator} from 'react-native-deprecated-custom-components';
import MusicMessage from './MusicMessage';
import Loading from './Loading';

const baseUrl = 'https://api.douban.com/v2/music/search?tag=';
var tags = ['校园', '流行', '嘻哈'];

var position = 0;
var hasMore = false;
var data = [];

var authors = '';

export default class MusicTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 != row2
            }),
        };
    }

    componentDidMount() {
        this.fetchMusicData();
    }

    fetchMusicData() {
        fetch(baseUrl + tags[position])
            .then((response) => response.json())
            .then((responseData) => {
                for (var i = 0; i < responseData.musics.length; i++) {
                    data.push(responseData.musics[i]);
                }
                this.setState({
                    isLoaded: true,
                    dataSource: this.state.dataSource.cloneWithRows(data)
                });
                position++;
                hasMore = false;

            })
            .catch((error) => {
                alert("获取音乐信息出错:" + error);
            });
    }

    renderLoadingView() {
        return (
            <View style={styles.loading}>
                <Image
                    source={require('../image/loading.gif')}
                    style={{height:200,width:200}}
                    onEndReached={this.onEnd.bind(this)}
                    renderFooter={this.renderFooter.bind(this)}/>
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
                    onEndReached={this.onEnd.bind(this)}
                    renderFooter={this.renderFooter.bind(this)}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.listStyle}/>
            </View>
        );
    }


    onEnd(music) {
        if (!hasMore) {
            hasMore = true;
            this.fetchMusicData();
        }
    }

    renderFooter(music) {
        return (
            <Loading style={styles.container}/>
        );
    }


    renderListViewItem(music) {
        for (var i = 0; i < music.author.length; i++) {
            if (i == 0 && music.author[0] != null) {
                authors = music.author[0].name;
            } else {
                authors += ',' + music.author[i].name;
            }
        }
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                style={styles.listItem}
                onPress={()=>{this.onMusicClick(music)}}
            >
                <View style={styles.listItem}>
                    <Image style={styles.itemImage} source={{uri:music.image}}/>
                    <View style={styles.itemViewStyle}>
                        <Text style={styles.itemTitle}>{music.title}</Text>
                        <Text style={styles.itemTxt}>{'评分:' + music.rating.average}</Text>
                        <Text style={styles.itemTxt}>{'作者:' + authors}</Text>
                    </View>
                </View>

            </TouchableOpacity>
        );
    }

    onMusicClick = (music) => {
        this.props.navigator.push({
            id: 'MusicMessage',
            args: {data: music},
            component: MusicMessage,
            sceneConfig: Navigator.SceneConfigs.PushFromRight
        });
    };


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    loading: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff'
    },
    listItem: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        marginLeft: 3,
        borderBottomWidth: 1,
        borderBottomColor: 'gray'
    },
    itemImage: {
        width: 110,
        height: 150,
        marginBottom: 8,
        marginTop: 8
    },
    itemViewStyle: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginLeft: 10
    },
    itemTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'left'
    },
    itemTxt: {
        fontSize: 17,
        marginTop: 5
    }
});