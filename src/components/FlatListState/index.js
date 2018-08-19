import React, {PureComponent} from 'react';
import {get} from 'lodash';
import {View} from 'react-native';
import {defaultPage, WrappedFlatList} from "../index";


export default class FlatListState extends PureComponent {

  constructor() {
    super();
    this.fnRenderRow = this.fnRenderRow.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.onLayout = this.onLayout.bind(this);
    this.state = {
      isLoading: false
    }
  }

  onScroll(event) {
    const {onScroll, onEndReached} = this.props;
    const { isLoading } = this.state;
    if (onScroll) {
      onScroll(event)
    }
    const offsetY = parseInt(event.nativeEvent.contentOffset.y + this.height, 10);
    const contentSizeH = parseInt(event.nativeEvent.contentSize.height, 10);
    if (offsetY >= contentSizeH) {
      if (onEndReached && !isLoading) {
        this.setState({isLoading: true},async () => {
            await onEndReached(event);
            this.setState({isLoading: false});
        });

      }
    }
  }

  onLayout(event) {
    this.height = event.nativeEvent.layout.height;
    this.width = event.nativeEvent.layout.width;
  }

  fnRenderRow() {
    const {onRefresh, style, emptyStyle, data, state, emptyTitle} = this.props;
    const length = get(data, 'length');

    if (state === 'error' && (length === 0 || data === undefined)) {
      return (<NetWorkError onPress={onRefresh}/>);
    }

    if (data === undefined) {
      return <View/>
    }

    if (length === 0) {
      return (
        <View style={[style, {width: this.width, height: this.height}, emptyStyle]}>
          {/* {defaultPage({status: 3, descText: `暂无${emptyTitle}`})} */}
        </View>
      )
    }
  }

  render() {
    const {data} = this.props;
    const length = get(data, 'length');
    if (length === 0 || data === undefined) {
      return (
        <WrappedFlatList
          {...this.props}
          data={[1]}
          renderItem={this.fnRenderRow}
          onScroll={this.onScroll}
          onLayout={this.onLayout}
        />
      )
    }
    return (
      <WrappedFlatList
        {...this.props}
        onEndReached={null}
        onLayout={this.onLayout}
        onScroll={this.onScroll}
        scrollEventThrottle={10}
      />
    )
  }
}
