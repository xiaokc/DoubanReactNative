/**
 * 电影信息
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
    BackHandler,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import {Navigator} from 'react-native-deprecated-custom-components';
import Detail from './Detail';

const url = 'https://api.douban.com/v2/movie/subject/';

export default class MovieBest extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 != row2,
        });
        this.state = {
            dataSource: ds.cloneWithRows(this.props.data.casts),
            content: '',
        };
    }

    componentDidMount() {
        this.fetchMovieData();
        BackHandler.addEventListener('hardwareBackPress', this._back.bind(this));
    }

    _back() {
        if (this.props.navigator) {
            this.props.navigator.pop();
            return true;
        }
        return false;
    }

    fetchMovieData() {
        fetch(url + this.props.data.id)
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    content: responseData.summary,
                    countries: responseData.countries[0]
                });
            }).done();
    }

    render() {
        var type = '';
        for (var i = 0; i <= this.props.data.genres.length; i++) {
            if (i == 0) {
                type = this.props.data.genres[0];
            } else {
                type += '/' + this.props.data.genres[i];
            }
        }
        return (
            <ScrollView style={styles.container}>
                <View style={styles.container}>
                    <View style={{height:50,backgroundColor:'#3683FB',justifyContent:'center', alignItems:'center'}}>
                        <TouchableOpacity style={{position:'absolute',top:10,left:10}} onPress={()=>{this._back()}}>
                            <Image style={{width:35,height:35}} source={require('../image/back.png')}/>
                        </TouchableOpacity>
                        <Text style={{alignItems:'center',fontSize:20,color:'#FFFFFF'}}>{'电影详情'}</Text>
                    </View>
                    <View style={styles.movieMessageView}>
                        <Image style={styles.infoImage} source={{uri:this.props.data.images.medium}}/>
                        <View style={styles.infoMessage}>
                            <Text style={styles.infoTxt}>{this.props.data.title}</Text>
                            <Text style={styles.infoTxt}>{this.props.data.original_title + '[原名]'}</Text>
                            <Text style={styles.infoTxt}>{'评分:' + this.props.data.rating.average}</Text>
                            <Text style={styles.infoTxt}>{this.props.data.year + '年 出品'}</Text>
                            <Text style={styles.infoTxt}>{type}</Text>
                            <Text style={styles.infoTxt}>{"国家:" + this.state.countries}</Text>
                        </View>
                    </View>

                    <Text style={styles.infoMessageBg}>{'简介'}</Text>

                    <Text style={styles.infoMsgContent}>{this.state.content}</Text>

                    <TouchableOpacity activeOpacity={0.8}>
                        <View style={styles.infoPeopleView}>
                            <Image style={styles.infoPeopleImg}
                                   source={{uri:this.props.data.directors[0].avatars.medium}}/>
                            <View style={styles.infoPeopleMsg}>
                                <Text style={{marginTop:15}}>{this.props.data.directors[0].name}</Text>
                                <Text style={{marginTop:3}}>{'[导演]'}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={this.renderListViewItem.bind(this)}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}/>

                    <TouchableOpacity activeOpacity={0.8} onPress={()=>{this.onMoreClick(this.props.data)}}>
                        <View style={styles.more}>
                            <Text style={{padding:5}}>{'更多'}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }

    renderListViewItem(casts) {
        return (
            <TouchableOpacity activeOpacity={0.8}>
                <View style={styles.infoPeopleView}>
                    <Image style={styles.infoPeopleImg} source={{uri:casts.avatars.medium}}/>
                    <View style={styles.infoPeopleMsg}>
                        <Text style={{marginTop:15}}>{casts.name}</Text>
                        <Text style={{marginTop:3}}>{'[演员]'}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    onMoreClick(movie) {
        this.props.navigator.push({
            id: 'detail',
            args: {data: movie},
            component: Detail,
            sceneConfig: Navigator.SceneConfigs.PushFromRight
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    movieMessageView: {
        flexDirection: 'row'
    }, infoImage: {
        width: 150,
        height: 200,
        marginTop: 10,
        marginLeft: 10
    }, infoMessage: {
        flexDirection: 'column',
        marginTop: 10,
        marginLeft: 10
    }, infoTxt: {
        marginTop: 5,
        fontSize: 15
    }, infoMessageBg: {
        padding: 2,
        backgroundColor: '#F2F2F2',
        width: 50,
        marginTop: 15,
        marginBottom: 10,
        marginLeft: 15,
        textAlign: 'center',
        borderRadius: 5
    }, infoMsgContent: {
        backgroundColor: '#F2F2F2',
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 20,
        padding: 3,
        borderRadius: 5
    }, infoPeopleImg: {
        width: 50,
        height: 50,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 15
    }, infoPeopleMsg: {
        flexDirection: 'column',
        marginLeft: 5
    }, infoPeopleView: {
        flexDirection: 'row',
        backgroundColor: '#F2F2F2',
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 15
    }, more: {
        height: 50,
        marginLeft: 15,
        marginRight: 15,
        marginTop: 10,
        marginBottom: 20,
        backgroundColor: '#F2F2F2',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
});
