/**
 * Created by xiaokecong on 21/08/2017.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
    Image,
    ScrollView,
    Text,
    BackHandler,
    TouchableOpacity,
    Button,
} from 'react-native';
import {Navigator} from 'react-native-deprecated-custom-components';
import Detail from './Detail';

var Dimensions = require('Dimensions');
const SCREEN_WIDTH = Dimensions.get('window').width;

export default class MusicMessage extends Component {
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
            <ScrollView style={{flex:1}}>
                <View style={styles.container}>
                    <View style={styles.imageViewBg}>
                        <Image style={styles.musicImage} source={{uri:this.props.data.image}}/>
                        <TouchableOpacity
                            style={{position:'absolute',top:10,left:10}}
                            onPress={()=>{this._back()}}>
                            <Image style={{width:35,height:35}}
                                   source={require('../image/back.png')}/>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.infoTitle}>{this.props.data.title}</Text>
                    <Text style={styles.infoTitle}>{this.props.data.rating.average + '分'}</Text>
                    <Text style={styles.infoTxt}>{this.props.data.author[0].name}</Text>
                    <Text style={styles.infoTxt}>{'出版时间:' + this.props.data.attrs.pubdate[0]}</Text>
                    <Text style={styles.infoTxt}>{'出版社:' + this.props.data.attrs.publisher[0]}</Text>

                    <View style={styles.buttonView}>
                        <Button
                            title={'查看详情'}
                            style={styles.buttonView}
                            onPress={()=>{this.onDetailClick(this.props.data)}}/>
                    </View>

                    <Text style={styles.infoSummary}>{'简介'}</Text>

                    <Text style={styles.infoContent}>{this.props.data.summary}</Text>

                    <Text style={styles.infoSummary}>{'曲目'}</Text>

                    <Text style={styles.infoContent}>{this.props.data.attrs.tracks[0]}</Text>
                </View>
            </ScrollView>
        );
    }

    onDetailClick(music) {
        this.props.navigator.push({
            id: 'detail',
            args: {data: music},
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
    imageViewBg: {
        height: 300,
        backgroundColor: '#000000',
        justifyContent: 'center',
        alignItems: 'center'
    },
    musicImage: {
        width: 150,
        height: 200
    },
    infoTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 15,
        marginTop: 5
    },
    infoTxt: {
        fontSize: 12,
        marginLeft: 15,
        marginTop: 4
    },
    buttonView: {
        width: 100,
        marginLeft: 30,
        marginTop: 15
    },
    infoSummary: {
        marginLeft: 15,
        marginTop: 15,
        marginBottom: 10
    },
    infoContent: {
        width: SCREEN_WIDTH,
        marginLeft: 10,
        marginRight: 10
    }
});