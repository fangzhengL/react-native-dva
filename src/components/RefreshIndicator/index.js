/*
 * @Author: changge
 * @Date: 2018-07-07 17:57:02
 * @Last Modified by: changge
 * @Last Modified time: 2018-07-21 14:34:03
 * flatList 加载动画
 */
import React, { Component } from 'react';
import { Animated, FlatList, Image, Text, TouchableOpacity, View, RefreshControl,StyleSheet ,Easing,Platform} from 'react-native';
import LottieView from 'lottie-react-native';
// import JYRefreshControl from './RefreshController';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eee',
    justifyContent: 'flex-start',
    alignItems: 'center',
    position:'absolute',
    width:'100%',
    height:400,
  },
  lottieBox:{
    width:80,
    height:80
  },
  lottie: {
    width: 80,
    height:80
  }
});

class RefreshIndicator extends Component {
  static defaultProps = {
    refreshing:true,
    onRefresh:()=>{},
    title:'',
    titleColor:''
  }
  constructor() {
    super();
    this.state = {
      progress: new Animated.Value(0)
    };
  }

  componentDidMount() {
    Animated.loop(
      Animated.timing(this.state.progress, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
      })
    ).start();
  }
  render() {
    // const {data} = this.props;
    return (
      <RefreshControl
        refreshing={this.props.refreshing}
        onRefresh={this.props.onRefresh}
        enabled={true}
        colors={['#4A78F8']}
        tintColor={'#A4BBFB'}
        title={'下拉刷新'}
        titleColor={'#999999'}
      />
    );
  }
}

export default Platform.select({
  android:(props)=><RefreshControl
    {...props}
    colors={["#4A78F8"]}
  />,
  ios:RefreshIndicator,
})
