'use strict';


import React, {
    Component
} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Animated,
    ListView,
    LayoutAnimation,
    TouchableOpacity,
    UIManager,
    TextInput
} from 'react-native';

import IMComponent, {
    ChatItemLeft,
    ChatItemRight
} from './heartgit-component/IMComponent'

let animationT = 0; //定义一个全局变量来标示动画时间
let animationN = 50; //余弦函数的极值倍数，即最大偏移值范围为正负50
let animationM = 150; //余弦函数偏移值，使得极值在100-200之间

var Dimensions = require('Dimensions');
const width = Dimensions.get('window').width;
const height =  Dimensions.get('window').height;

var getWidthPercent = (percent) => width * percent * 0.01;
var getHeightPercent = (percent) => height * percent * 0.01;


var Click = React.createClass({
    componentWillMount() {
        // 创建动画
        LayoutAnimation.spring(10, 30);
    },

    getInitialState() {
        return {
            w: 100,
            h: 100
        };
    },

    _onPress() {
        // 让视图的尺寸变化以动画形式展现
        LayoutAnimation.spring(10, 30);
        this.setState({
            w: this.state.w + 15,
            h: this.state.h + 15
        })
    },
    _onPresss() {
        // 让视图的尺寸变化以动画形式展现
        LayoutAnimation.spring(10, 30);
        this.setState({
            w: this.state.w - 15,
            h: this.state.h - 15
        })
    },
    render() {
        return(

            <View style = {styles.container}>
                <View style = {[styles.box, {width: this.state.w,height: this.state.h}]}/>
                <TouchableOpacity onPress = {this._onPress}>
                    <View style = {styles.button}>
                        <Text style = {styles.buttonText}>
                            zoom +
                        </Text>
                    </View >
                </TouchableOpacity>
                <TouchableOpacity onPress = {this._onPresss}>
                    <View style = {styles.button}>
                        <Text style = {styles.buttonText}>
                            zoom -
                        </Text>
                    </View>
                </TouchableOpacity>
            </View >
    );
}
});


var Loading = React.createClass({

    getInitialState() {
        return {
            fV: 1,
            sV: 1,
            tV: 1,
            foV: 1
        };
    },
    componentDidMount() {

        animationT = 0;
        requestAnimationFrame(this.loopAnimation.bind(this)); //组件加载之后就执行loopAnimation动画
    },

    loopAnimation() {
        var t0 = animationT,
            t1 = t0 + 0.5,
            t2 = t1 + 0.5,
            t3 = t2 + 0.5,
            t4 = t3 + 0.5; //这里分别是四个动画的当前时间，依次加上了0.5的延迟
        var v1 = Number(Math.cos(t0).toFixed(2)) * animationN + animationM; //将cos函数的小数值只精确到小数点2位，提高运算效率
        var v2 = Number(Math.cos(t1).toFixed(2)) * animationN + animationM;
        var v3 = Number(Math.cos(t2).toFixed(2)) * animationN + animationM;
        var v4 = Number(Math.cos(t3).toFixed(2)) * animationN + animationM;
        this.setState({
            fV: v1,
            sV: v2,
            tV: v3,
            foV: v4
        });
        animationT += 0.4; //增加时间值，每次增值越大动画越快
        requestAnimationFrame(this.loopAnimation.bind(this));
    },
    render() {
        return(
            < View style = {styles.container} >
                < Animated.View style = {[styles.line, {height: this.state.fV}]} >< /Animated.View >
                < Animated.View style = {[styles.line, {height: this.state.sV}]} >< /Animated.View >
                < Animated.View style = {[styles.line, {height: this.state.tV}]} >< /Animated.View >
                < Animated.View style = {[styles.line,{height: this.state.foV}]} >< /Animated.View >

            < /View >
        );
    }
})

class heartgit extends Component {
    _data = [
        {
            name: 'haha',
            des: 'hello there , sup ?',
            time: '19: 30',
            ChatItemLeft: true,
        },
        {
            name: 'haha',
            des: 'hello there , sup ?',
            time: '19: 30',
            ChatItemLeft: true,
        },
        {
            name: 'qwe',
            des: 'Awesome, but i think the "earth" icon need to adjust size, in visual, It seems a little small :)',
            time: '19: 30',
            ChatItemLeft: true,
        },
        {
            name: 'asd',
            des: '我要女票啊啊啊啊啊啊啊！！！！',
            time: '19: 30',
            ChatItemLeft: false,

        }]
    constructor(props) {
        super(props);
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        UIManager.setLayoutAnimationEnabledExperimental(true);
        var ds = new ListView.DataSource({
            rowHasChanged: (r1,r2) => r1 !== r2
        });
        this.state = {
            dataSource: ds.cloneWithRows(this._data),
            text: null
        };
    }
    _onDataChanged = (newData) => {
        this._data =  this._data.concat(newData);
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this._data),
            text: null
        })
        setTimeout(() => this._scrollToBottom(), 50);
    }
    _scrollToBottom() {
        let scrollResponder = this.refs.ChatListView.getScrollResponder();
        scrollResponder.scrollResponderScrollTo({x: 0, y: 10000, animated: true}); // 10k is just random number high enough to scroll right to the bottom.
    }
    _onPress() {

        this._onDataChanged([{
            name: 'asd',
            des: '我要女票啊啊啊啊啊啊啊！！！！',
            time: '19: 30',
            ChatItemLeft: false,
        }]);

    }
    render() {
        return(
            <View style = {{backgroundColor: '#F5FCFF'}}>
                <TouchableOpacity onPress = {this._onPress.bind(this)}>
                    <View style = {styles.button}>
                        <Text style = {styles.buttonText}>
                            ++
                        </Text>
                    </View>
                </TouchableOpacity>
                <ListView
                    ref = "ChatListView"
                    style = {styles.ChatListViewContainer}
                    dataSource = {this.state.dataSource}
                    renderRow = {(rowData, rowHasChanged) => rowData.ChatItemLeft !== true ? <ChatItemRight messagetime = {rowData.time}>{rowData.des}</ChatItemRight> : <ChatItemLeft onPress = {this._onPress.bind(this)} messagetime = {rowData.time}>{rowData.des}</ChatItemLeft>
                    }
                />
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1, fontSize:17}}
                    onSubmitEditing={() => this.state.text !== null ? this._onDataChanged([{name: 'heartblood',des: this.state.text,ChatItemLeft: false,time: '20:00'}]):null}
                    onChangeText = { (message) => this.setState({
                        text: message
                    })}
                    value={this.state.text}
                    blurOnSubmit = {false}
                    placeholder = "type something"
                    placeholderTextColor = '#e6e6e6'
                />
            </View>

        );
    }
}

const styles = StyleSheet.create({
    line: {
        marginLeft: 20,
        width: 10,
        flex: 1,
        backgroundColor: 'black'
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    ChatListViewContainer: {
        elevation: 10,
        backgroundColor: '#F5FCFF',
        height: 400
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    box: {
        backgroundColor: 'red',
    },
    button: {
        marginTop: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: 'black',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
AppRegistry.registerComponent('heartgit', () => heartgit);
