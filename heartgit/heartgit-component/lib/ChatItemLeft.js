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
    LayoutAnimation,
    TouchableOpacity,
    UIManager,
    ReactToAndroid
} from 'react-native';

var Dimensions = require('Dimensions');
const width = Dimensions.get('window').width;
const height =  Dimensions.get('window').height;

var getWidthPercent = (percent) => width * percent * 0.01;
var getHeightPercent = (percent) => height * percent * 0.01;


class ChatItemLeft extends Component{
    constructor(props) {
        super(props);
        this.state = {
            measureView: false,
            viewMove: false,
            widthFlex: 2,
            bounceValue: new Animated.Value(0)
        };
    }
    _onPress() {
        var JudgeValue = () => this.state.viewMove !== true ? getWidthPercent(20) : 0;
        Animated.spring(
            this.state.bounceValue,
            {
                toValue: JudgeValue(),
                friction: 1,
            }
        ).start();
        this.setState({
            viewMove: !this.state.viewMove
        });
    }
    componentDidMount() {
        this.state.bounceValue.setValue(getWidthPercent(-60));
        Animated.spring(
            this.state.bounceValue,
            {
                toValue: 0,
                friction: 5,
            }
        ).start();
    }
    measureView(event) {
        console.log(width);
        if (this.state.measureView !== true) {
            event.nativeEvent.layout.height < 90 ? this.setState({widthFlex:0}):null;
            this.state.measureView = true;
        }
    }
    render() {
        return(
            <Animated.View style={{width:getWidthPercent(100), marginLeft: this.state.bounceValue}}>
                <View style={styles.ChatItem}>
                    <TouchableOpacity onLayout={(event) => this.measureView(event)} ref='container' style = {[styles.container, {flex:this.state.widthFlex}]} onPress = {this._onPress.bind(this)}>
                        <View style = {[styles.ItemContainer]}>
                            <Text  style = {styles.ItemText}>
                                {this.props.children}
                            </Text>
                            <Text style={styles.ItemTime}>
                                {this.props.messagetime}
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{flex:1}}>
                    </View>
                </View>
            </Animated.View>

        );
    }
}

const styles = StyleSheet.create({
    ChatItem: {
        flexDirection: 'row',
        flex: 3,
    },
    ItemTime: {
        margin:15,
        color: '#878787',
        textAlign: 'left',
    },
    ItemContainer: {
        borderRadius: 15,
        borderTopLeftRadius: 0,
        backgroundColor: '#cae9f2',
        shadowOffset: {width:100, height:100,top:10},
    },
    container: {
        paddingLeft: getWidthPercent(5),
        margin: 15,
        marginLeft: 0,
        marginTop: 10,
        justifyContent: 'center',
        elevation: 10,
    },
    ItemText: {
        margin: 15,
        marginBottom:0,
        textAlign: 'left',
        fontSize: 17,
        fontWeight: 'bold',
    },
});

module.exports = ChatItemLeft;
