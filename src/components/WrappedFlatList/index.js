import React,{createRef} from 'react';
import { FlatList, StyleSheet, Animated, RefreshControl, Easing, Platform, View, Text, Dimensions } from 'react-native';
import {pageBgColor} from "@/pages/constants/colors";
export default class WrappedFlatList extends React.Component {
  static defaultProps = {
    refreshing: false,
    onRefresh: () => {},
  };
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
  }
  componentWillReceiveProps(props) {

  }
  render() {
    const {style}=this.props
    return (
      <FlatList
        style={style?style:{backgroundColor:pageBgColor }}
        onLayout={this.props.onLayout}
        data={this.props.data || []}
        onScroll={this.props.onScroll}
        scrollEnabled={this.props.scrollEnabled}
        renderItem={this.props.renderItem}
        ListHeaderComponent={this.props.ListHeaderComponent || null}
        ItemSeparatorComponent={this.props.ItemSeparatorComponent} // 行与行之间的分隔线组件
        ListEmptyComponent={this.props.ListEmptyComponent} //列表为空时渲染该组件
        ListFooterComponent={this.props.ListFooterComponent}
        initialNumToRender={this.props.initialNumToRender}
        initialScrollIndex={this.props.initialScrollIndex}
        keyExtractor={this.props.keyExtractor}
        onEndReached={this.props.onEndReached}
        onEndReachedThreshold={this.props.onEndReachedThreshold}
        onScrollBeginDrag={this.props.onScrollBeginDrag}
        onScrollEndDrag={this.props.onScrollEndDrag}
        refreshControl={
            <RefreshControl
              refreshing={this.props.refreshing}
              onRefresh={this.props.onRefresh}
              enabled={true}
              colors={['#4A78F8']}
              tintColor={'#A4BBFB'}
              title={'下拉刷新'}
              titleColor={'#999999'}
            />
        }
      >
        {this.props.children || null}
      </FlatList>
    );
  }

}

const styles = StyleSheet.create({

});
