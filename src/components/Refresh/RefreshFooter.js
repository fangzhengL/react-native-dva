import React, {Component} from 'react';
import {View, Text, ActivityIndicator, StyleSheet, TouchableOpacity} from 'react-native';
import RefreshState from './RefreshState';
import PropTypes from 'prop-types';

export default class RefreshFooter extends Component {

  static propTypes = {
    onLoadMore: PropTypes.func,     // 加载更多数据的方法
    onRetryLoading: PropTypes.func, // 重新加载的方法
  };

  static defaultProps = {
    footerRefreshingText: '加载中...',
    footerLoadMoreText: '上拉加载更多',
    footerFailureText: '点击重新加载',
    footerNoMoreDataText: '我也是有底线的'
  };

  render() {
    let {state} = this.props;
    let footer = null;
    switch (state) {
      case RefreshState.Idle:
        // Idle情况下为null，不显示尾部组件
        break;
      case RefreshState.Refreshing:
        footer =
          <View style={styles.loadingView}>
            <ActivityIndicator size="small"/>
            <Text style={styles.refreshingText}>{this.props.footerRefreshingText}</Text>
          </View>;
        break;
      case RefreshState.CanLoadMore:
        footer =
          <View style={styles.loadingView}>
            <Text style={styles.footerText}>{this.props.footerLoadMoreText}</Text>
          </View>;
        break;
      case RefreshState.NoMoreData:
        footer =
          <View style={styles.loadingView}>
           <View style={styles.ln}/>
            <Text style={[styles.footerText,{marginLeft:10,marginRight:10}]}>{this.props.footerNoMoreDataText}</Text>
            <View style={styles.ln}/>
          </View>;
        break;
      case RefreshState.Failure:
        footer =
          <TouchableOpacity style={styles.loadingView} onPress={()=>{
            this.props.onRetryLoading && this.props.onRetryLoading();
          }}>
            <Text style={styles.footerText}>{this.props.footerFailureText}</Text>
          </TouchableOpacity>;
        break;
        case RefreshState.Null:
        footer =
          <View style={styles.loadingView}>
            <Text style={styles.footerTextNull}></Text>
          </View>;
        break;
    }
    return footer;
  }
}

const styles = StyleSheet.create({
  loadingView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  refreshingText: {
    fontSize: 12,
    color: "#666666",
    paddingLeft: 10,
  },
  footerText: {
    fontSize: 12,
    color: "#C5C5C5",
  },
  footerTextNull: {
    fontSize: 12,
    color: "#C5C5C5",
    width: '100%'
  },
  ln:{backgroundColor:"#C5C5C5",height:1,width:20}
});
