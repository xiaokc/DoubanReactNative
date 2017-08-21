/**
 * Created by xiaokecong on 21/08/2017.
 */
import React, {
    Component,
}from 'react';

import {
    AppRegistry,
    StyleSheet,
    View,
    Text,
    Image,
    ListView,
    TouchableOpacity,
    ScrollView,
    Button,
    BackHandler
}from 'react-native';
import {Navigator} from 'react-native-deprecated-custom-components';

import Detail from './Detail';

var Dimensions = require('Dimensions');
const SCREEN_WIDTH = Dimensions.get('window').width;
var authors = '';

export default class BookMessage extends Component {
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
        for (var i = 0; i < this.props.data.author.length; i++) {
            if (i == 0 && this.props.data.author[0] != null) {
                authors = this.props.data.author[0];
            } else {
                authors += ',' + this.props.data.author[i];
            }
        }

        return (
            <ScrollView style={{flex:1}}>
                <View style={styles.container}>
                    <View style={styles.imageViewBg}>
                        <Image style={styles.bookImage} source={{uri:this.props.data.image}}/>
                        <TouchableOpacity
                            style={{position:'absolute',top:10,left:10}}
                            onPress={()=>this._back()}>
                            <Image style={{width:35,height:35}} source={require('../image/back.png')}/>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.infoTitle}>{this.props.data.title}</Text>
                    <Text numberOfLines={1} style={styles.infoTitle}>{this.props.data.rating.average}</Text>
                    <Text numberOfLines={1} style={styles.infoTxt}>{authors}</Text>
                    <Text style={styles.infoTxt}>{'出版时间：' + this.props.data.pubdate}</Text>
                    <Text style={styles.infoTxt}>{'出版社：' + this.props.data.publisher}</Text>
                    <Text style={styles.infoTxt}>{'售价：' + this.props.data.price}</Text>
                    <View style={styles.buttonView}>
                        <Button
                            title={'查看详情'}
                            style={styles.buttonView}
                            onPress={()=>{this.onDetailClick(this.props.data)}}/>
                    </View>

                    <Text style={styles.infoSummary}>{'简介'}</Text>
                    <Text style={styles.infoContent}>{this.props.data.summary}</Text>
                    <Text style={styles.infoSummary}>{'作者简介'}</Text>
                    <Text style={styles.infoContent}>{this.props.data.author_intro}</Text>
                </View>
            </ScrollView>
        );
    }

    onDetailClick(book) {
        this.props.navigator.push({
            id: 'detail',
            args: {data: book},
            component: Detail,
            sceneConfig: Navigator.SceneConfigs.PushFromRight
        });
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
    bookImage: {
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