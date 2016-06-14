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
} from 'react-native';
var Dimensions = require('Dimensions');
const width = Dimensions.get('window').width;
const height =  Dimensions.get('window').height;

var getWidthPercent = (percent) => width * percent * 0.01;
var getHeightPercent = (percent) => height * percent * 0.01;


class ChatItemRight extends Component{
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
        var JudgeValue = () => this.state.viewMove !== true ? getWidthPercent(-20) : 0;
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
        this.state.bounceValue.setValue(getWidthPercent(60));
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
                    <View style={{flex:1}}>
                    </View>
                    <TouchableOpacity  onLayout={(event) => this.measureView(event)} ref='container' style = {[styles.container, {flex:this.state.widthFlex}]} onPress = {this._onPress.bind(this)}>
                        <View style = {[styles.ItemContainer]}>
                            <Text  style = {styles.ItemText}>
                                {this.props.children}
                            </Text>
                            <Text style={styles.ItemTime}>
                                {this.props.messagetime}
                            </Text>
                        </View>
                    </TouchableOpacity>

                </View>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    ChatItem: {
        flexDirection: 'row',
        flex: 3,
        alignItems: 'flex-end'
    },
    ItemTime: {
        margin:15,
        textAlign: 'right',
        color: '#999999'
    },
    ItemContainer: {
        borderRadius: 15,
        borderTopRightRadius: 0,
        backgroundColor: '#e0e0e0',
        shadowOffset: {width:100, height:100,top:10},
    },
    container: {
        paddingRight: getWidthPercent(5),
        margin: 15,
        marginRight: 0,
        marginTop: 10,
        elevation: 10,
    },
    ItemText: {
        margin: 15,
        marginBottom: 0,
        textAlign: 'left',
        fontSize: 17,
        fontWeight: 'bold',
    },
});

module.exports = ChatItemRight;
