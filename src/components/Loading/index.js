/*
 * @Author: changge
 * @Date: 2018-07-05 15:52:37
 * @Last Modified by: changge
 * @Last Modified time: 2018-07-31 10:59:43
 */

import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Animated, Easing, TouchableOpacity, Dimensions, Modal } from 'react-native';
import LottieView from 'lottie-react-native';

const ANIMATION = ['none', 'slide', 'fade'];
const SIZES = ['small', 'normal', 'large'];
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  modal: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    // zIndex: 999,
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottieBox: {
    width: 90,
    height: 90,
  },
  lottie: {
    width: 90,
    height: 90,
  },
});

export default class Spinner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: this.props.visible,
      textContent: this.props.textContent,
      progress: new Animated.Value(0),
    };
  }

  static propTypes = {
    visible: PropTypes.bool,
    cancelable: PropTypes.bool,
    textContent: PropTypes.string,
    animation: PropTypes.oneOf(ANIMATION),
    color: PropTypes.string,
    size: PropTypes.oneOf(SIZES),
    overlayColor: PropTypes.string,
    pressCloseable: PropTypes.bool,
    sType: PropTypes.string,
    style: PropTypes.object
  };

  static defaultProps = {
    visible: false,
    cancelable: false,
    textContent: '',
    animation: 'none',
    color: 'white',
    size: 'large', // 'normal',
    overlayColor: 'rgba(0, 0, 0, 0.25)',
    pressCloseable: true,
    sType: 'modal',  // modal,plain
  };

  close() {
    this.setState({ visible: false });
  }
  show = () => {
    this.setState({ visible: true }, () => {
      Animated.loop(
        Animated.timing(this.state.progress, {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
        })
      ).start();
    });
  };

  componentWillReceiveProps(nextProps) {
    const { visible, textContent } = nextProps;
    this.setState({ visible, textContent });
    if (visible) {
      Animated.loop(
        Animated.timing(this.state.progress, {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
        })
      ).start();
    }
  }
  componentDidMount() {}

  _handleOnRequestClose() {
    if (this.props.cancelable) {
      this.close();
    }
  }

  _renderSpinner() {
    const { visible } = this.state;
    const { style } = this.props;
    if (!visible) return null;
    if (this.props.sType === 'modal') {
      return (
        <Modal
          transparent={true}
          onRequestClose={() => {
            console.log('request close');
          }}
          visible={visible}
        >
          <TouchableOpacity
            style={{ flex: 1 }}
            activeOpacity={1}
            onPress={() => {
              if (this.props.pressCloseable) {
                this.close();
              }
            }}
          >
            <View style={styles.container}>
              <View style={styles.lottieBox}>
                <LottieView
                  style={[styles.lottie]}
                  source={require('./data.json')}
                  progress={this.state.progress}
                  loop={true}
                />
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
      );
    }
    if (this.props.sType === 'plain') {
      if (visible) {
        return (
          <View style={[styles.container, style]}>
            <View style={styles.lottieBox}>
              <LottieView
                style={[styles.lottie]}
                source={require('./data.json')}
                progress={this.state.progress}
                loop={true}
              />
            </View>
          </View>
        );
      } else {
        return null;
      }
    }
    return null;
  }

  render() {
    return this._renderSpinner();
  }

  fnPressModal = () => {
    // let nowTime=new Date().getTime();
    // if(this.state.lastPressTime&&(nowTime-this.state.lastPressTime)<1500){
    //   this.setState({
    //     visible:false
    //   })
    // }else{
    //   this.setState({
    //     lastPressTime:nowTime
    //   })
    // }
  };
}
