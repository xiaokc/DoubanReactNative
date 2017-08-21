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
    Text,
    TouchableOpacity
} from 'react-native';
import {Navigator} from 'react-native-deprecated-custom-components';

import BookMessage from './BookMessage';
import Loading from './Loading';

var Dimensions = require('Dimensions');
const SCREEN_WIDTH = Dimensions.get('window').width;

var baseUrl = 'https://api.douban.com/v2/book/search?tag=';
var tags = ["科技", "经典"];

var position = 0;
var hasMore = false;
var data = [];

export default class BookTab extends Component {
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
        this.fetchBookData();
    }

    fetchBookData() {
        fetch(baseUrl + tags[position])
            .then((response) => response.json())
            .then((responseData) => {
                for (var i = 0; i < responseData.books.length; i++) {
                    data.push(responseData.books[i]);
                }
                this.setState({
                    isLoaded: true,
                    dataSource: this.state.dataSource.cloneWithRows(data)
                });
                position++;
                hasMore = false;

            })
            .catch((error) => {
                alert("获取图书信息出错:" + error);
            });
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


    renderLoadingView() {
        return (
            <View style={styles.loading}>
                <Image
                    source={require('../image/starting.gif')}
                />
            </View>
        );
    }

    onEnd(book) {
        if (!hasMore) {
            hasMore = true;
            this.fetchBookData();
        }
    }

    renderFooter(book) {
        return (
            <Loading style={styles.container}/>
        );
    }


    renderListViewItem(book) {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                style={styles.itemViewStyle}
                onPress={()=>{this.onBookClick(book)}}
            >
                <View style={styles.itemViewStyle}>
                    <Image style={styles.itemImage} source={{uri:book.image}}/>
                    <Text numberOfLines={1} style={styles.itemTitle}>{book.title}</Text>
                    <Text numberOfLines={1} style={styles.itemTxt}>{book.publisher}</Text>
                </View>

            </TouchableOpacity>
        );
    }


    onBookClick = (book) => {
        this.props.navigator.push({
            id: 'detail',
            args: {data: book},
            component: BookMessage,
            sceneConfig: Navigator.SceneConfigs.PushFromRight
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
        flexWrap: 'wrap'
    },
    itemViewStyle: {
        width: SCREEN_WIDTH / 3,
        height: 190,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        marginTop: 2,
        marginBottom: 2
    },
    itemImage: {
        width: 100,
        height: 150,
        marginTop: 3
    },
    itemTitle: {
        fontSize: 17,
        textAlign: 'left',
        justifyContent: 'flex-start'
    },
    itemTxt: {
        fontSize: 12,
        marginBottom: 12,
        textAlign: 'left',
        justifyContent: 'flex-start'
    }
});