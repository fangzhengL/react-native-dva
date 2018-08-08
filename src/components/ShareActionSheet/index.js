import React, { Component } from 'react'
import { View, Text, StyleSheet, Button, Image, Modal, Animated, NativeModules } from 'react-native'
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import PropTypes from 'prop-types';
import TouchButton from '@/components/Button';

export default class ShareActionSheet extends Component<Props> {
  constructor(props) {
    super(props);
    this.translateY = 245;
    this.state = {
      bVisible: false,
      oSheetAnim: new Animated.Value(this.translateY),
      oFadeAnim: new Animated.Value(0)
    };
  }
  static propTypes= {
    title: PropTypes.string, // 标题
    show: PropTypes.func, // 显示
    hide: PropTypes.func, // 隐藏
  }

  fnBsnCancel = (...args) => {
    this.fnBsnHide();
  }

  fnBsnHide = () => {
    Animated.timing(this.state.oFadeAnim, {
      toValue: 0,
      duration: 150
    }).start(() => this.setState({ bVisible: false }));
    Animated.timing(this.state.oSheetAnim, {
      toValue: this.translateY,
      duration: 150
    }).start();
  }

  fnBsnShow = () => {
    this.setState({ bVisible: true });
    Animated.timing(this.state.oFadeAnim, {
      toValue: 1,
      duration: 100
    }).start();
    Animated.timing(this.state.oSheetAnim, {
      toValue: 0,
      duration: 250
    }).start();
  }
  fnBsnShare = ({ sType }) => () => {
    this.props.fnBsnShareCallback(sType);
  }


  render() {
    const { bVisible, oSheetAnim } = this.state;
    const { sTitle } = this.props;
    return (
        <Modal
          visible={ bVisible }
          transparent={ true }
          animationType="none"
          onRequestClose={ this.fnBsnCancel }
        >
          <Animated.View style={[styles.container, { opacity: this.state.oFadeAnim }]}>
            <TouchButton onPress={this.fnBsnHide}  style={{ height: '100%', width: '100%', position: 'absolute', top: 0, backgroundColor: 'transparent' }} color='transparent' >
              <View />
            </TouchButton>
            <Animated.View style={[styles.content,  { height: this.translateY, transform: [{ translateY: oSheetAnim }]}]}>

              <View style={styles.title}>
                <View style={styles.title_line} />
                <Text style={styles.title_text}>分享至</Text>
                <View style={styles.title_line} />
              </View>

              <View style={styles.icons}>
                { this.fnBsnRenderShare() }
              </View>

              <View style={styles.base_line} />

              <TouchButton style={styles.cancel_btn} onPress={this.fnBsnHide} underlayColor="white">
                <View style={styles.cancel_btn_container}>
                  <Text style={styles.cancel_text}>取消</Text>
                </View>
              </TouchButton>

            </Animated.View>
          </Animated.View>

        </Modal>
    )
  }


  fnBsnRenderShare = () => oShareList.map((oCurrentValue) =>
    <View style={styles.icon} onPress={this.fnBsnShare(oCurrentValue)} key={oCurrentValue.sType}>
      <View>
        <TouchButton onPress={this.fnBsnShare(oCurrentValue)}>
          { oCurrentValue.oIcon }
        </TouchButton>
      </View>
      <Text style={styles.image_title}>{oCurrentValue.sTitle}</Text>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, .2)',
    alignItems: 'flex-end'
  },
  content: {
    height: 245,
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center'
  },
  title: {
    paddingTop: 31,
    flexDirection: 'row',
    alignItems: 'center'
  },
  title_text: {
    color: '#29354D',
    fontSize: 16,
    paddingLeft: 23,
    paddingRight: 23
  },
  title_line: {
    width: 80,
    height: 1,
    backgroundColor: '#E6E7EA'
  },
  icons: {
    flexDirection: 'row',
    paddingTop: 39
  },
  icon: {
    flex: 1,
    alignItems: 'center'
  },
  image: {
    width: 50,
    height: 50,
  },
  image_title: {
    paddingTop: 10,
    fontSize: 12,
    color: '#656E7B'
  },
  base_line: {
    marginTop: 31,
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, .1)',
    shadowColor: '#000',
    shadowOpacity: 1,
    shadowOffset: { width: 5, height: 3 }
  },
  cancel_btn: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white'
  },
  cancel_btn_container: {
    flex: 1,
  },
  cancel_text: {
    fontSize: 18,
    color: '#4A78F8',
    textAlign: 'center'
  }
})

const oShareList = [
  { sTitle: '微信好友', sType: '1', oIcon: <Image source={require('@/assets/images/share/icon_app_weixinhaoyou3x.png')} style={styles.image} /> },
  { sTitle: '朋友圈', sType: '2', oIcon: <Image source={require('@/assets/images/share/icon_app_pengyouquan3x.png')} style={styles.image} /> },
  { sTitle: '微博', sType: '0', oIcon: <Image source={require('@/assets/images/share/icon_app_weibo3x.png')} style={styles.image} /> },
  { sTitle: 'QQ好友', sType: '4', oIcon: <Image source={require('@/assets/images/share/icon_app_qqhaoyou3x.png')} style={styles.image} /> },
]



