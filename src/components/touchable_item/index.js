/**
 * Created by liangfangzheng on 2018/7/4.
 */
import React from 'react';
import {
  Platform,
  TouchableNativeFeedback,
  TouchableHighlight,
  View,
} from 'react-native';

const ANDROID_VERSION_LOLLIPOP = 21;

export default class TouchableItem extends React.Component {
  static defaultProps = {
    borderless: false,
    pressColor: 'rgba(0, 0, 0, .32)',
  };

  constructor() {
    super();
    this.onPress = this.onPress.bind(this);
    this.state = {
      isOn: false,
    }
  }

  onPress() {
    const {onPress} = this.props;
    const {isOn} = this.state;
    if (isOn) {
      return
    }
    if (onPress) {
      this.setState({isOn: true});
      setTimeout(() => {
        this.setState({isOn: false});
      }, 1000);
      onPress()
    }
  }

  render() {
    // if (
    //   Platform.OS === 'android' &&
    //   Platform.Version >= ANDROID_VERSION_LOLLIPOP
    // ) {
    //   const {style, ...rest,} = this.props;
    //   return (
    //     <TouchableNativeFeedback
    //       {...rest}
    //       style={null}
    //       onPress={this.onPress}
    //       background={TouchableNativeFeedback.Ripple(
    //         this.props.pressColor,
    //         this.props.borderless
    //       )}
    //     >
    //       <View style={style}>{this.props.children}</View>
    //     </TouchableNativeFeedback>
    //   );
    // }

    if (this.props.children.length > 1) {
      return (
        <TouchableHighlight
          underlayColor={'rgba(0,0,0, 0.05)'}
          {...this.props}>
          <View style={this.props.containerStyle}>
            {this.props.children}
          </View>
        </TouchableHighlight>
      )
    }

    return (
      <TouchableHighlight
        underlayColor={'rgba(0,0,0, 0.05)'}
        {...this.props}>
        {this.props.children}
      </TouchableHighlight>
    );
  }
}
