import React from 'react';
import {
  View,
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  Dimensions,
  StatusBar,
} from 'react-native';
import { lnColor } from '../../pages/constants/colors';

const windowWidth = Dimensions.get('window').width;
const bgColor = 'rgba(0, 0, 0, 0.5)';
type DialogInit = {
  title: String, //标题
  content: String,
  fnArgConfirm: Function,
  fnArgCancel: Function,
  bShowCancelBtn: Boolean,
  confirmText: String,
  cancelText: String,
  containerStyle: Object,
  titleStyle: Object,
  contentStyle: Object,
  contentContainerStyle: Object,
  confirmTextStyle: Object,
  cancelTextStyle: Object,
  confirmButtonStyle: Object,
  cancelButtonStyle: Object,
  component: Object,
  statusBarProps: Object,
  disableClose: boolean,
};
export default class Dialog extends React.Component {
  constructor() {
    super();
    this.state = {
      visible: false,
    };
    this.config = {};
  }

  init = (dialogInit: DialogInit = {}) => {
    this.config = dialogInit;
  };
  show = () => {
    this.setState({
      visible: true,
    });
  };

  hide = () => {
    const { onHide } = this.props;
    onHide && onHide();
    this.setState({
      visible: false,
    });
  };

  _renderButton = (text, fnArg, textStyle, btnStyle) => {
    return (
      <TouchableOpacity onPress={fnArg && fnArg} style={[styles.btn, btnStyle]}>
        <Text style={[styles.btnText, textStyle]}>{text}</Text>
      </TouchableOpacity>
    );
  };

  _renderDefault = () => {
    const {
      title,
      fnArgConfirm,
      confirmText,
      content,
      fnArgCancel,
      cancelText,
      bShowCancelBtn,
      containerStyle,
      confirmTextStyle = styles.confirmText,
      cancelTextStyle = styles.cancelText,
      confirmButtonStyle = styles.confirmBtn,
      cancelButtonStyle = styles.cancelBtn,
      buttonContainerStyle,
      titleStyle,
      contentContainerStyle = styles.contentContainer,
      contentStyle,
    } = this.config;
    return (
      <TouchableOpacity activeOpacity={1} style={[styles.dialogContainer, containerStyle]}>
        {title && <Text style={[styles.title, titleStyle]}>{title}</Text>}
        <View style={contentContainerStyle}>
          <Text style={[styles.content, contentStyle]}>{content}</Text>
        </View>
        <View style={[styles.btnContainer, buttonContainerStyle]}>
          {bShowCancelBtn && this._renderButton(cancelText, fnArgCancel, cancelTextStyle, cancelButtonStyle)}
          {this._renderButton(confirmText, fnArgConfirm, confirmTextStyle, confirmButtonStyle)}
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const { visible } = this.state;
    const { component, statusBarProps = {},disableClose } = this.config;
    const { translucent } = statusBarProps;
    let hide=disableClose ? () => {} : this.hide
    return (
      <Modal transparent={true} visible={visible} onRequestClose={hide} {...this.props}>
        <TouchableWithoutFeedback onPress={hide} {...this.props}>
          <View style={styles.container}>
            <StatusBar translucent={translucent} backgroundColor={bgColor} barStyle={'light-content'} />
            {(component && component) || this._renderDefault()}
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: bgColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialogContainer: {
    width: 271,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
  },
  btnContainer: {
    flexDirection: 'row',
  },
  content: {
    fontSize: 16,
    marginTop: 30,
    marginBottom: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },

  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmBtn: {
    height: 50,
    justifyContent: 'center',
    borderColor: lnColor,
    borderTopWidth: 0.5,
  },
  cancelBtn: {
    height: 50,
    justifyContent: 'center',
    borderRightWidth: 0.5,
    borderTopWidth: 0.5,
    borderColor: lnColor,
  },
  btnText: {
    fontSize: 16,
  },
  confirmText: { color: '#4A78F8' },
  cancelText: { color: '#999999' },
});
