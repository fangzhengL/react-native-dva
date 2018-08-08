import { View } from 'react-native';
import React, { Component } from 'react';
import { get } from 'lodash';
import { tabButton } from "../../pages/customer/component";
import { backIcon } from "../../assets/images/customer";

export default NavHoc = (params) => WrappedComponent => class extends Component {

    static navigationOptions = ({navigation}) => {
      const goBack = () => navigation.goBack();
      const navParams = (WrappedComponent.setNav && WrappedComponent.setNav(navigation)) || params || navigation.state.params;
      const title = get(navParams, 'title');
      const hidHeader = get(navParams, 'hidHeader');
      const onLeft = get(navParams, 'onLeftPress');
      const headerRight = get(navParams, 'headerRight');
      const leftIconStyle = get(navParams, 'backIconStyle');
      const leftIcon = get(navParams, 'backIcon') || backIcon;
      const headerStyle = get(navParams, 'headerStyle');
      const headerTitleStyle = get(navParams, 'headerTitleStyle');
      let onLeftPress;
      !!onLeft ? onLeftPress = () => {onLeft(navigation);goBack()} : onLeftPress = null;
      if (hidHeader) {
        return {header: null}
      }
      return {
        title:  (navigation.state.params && navigation.state.params.title) || title,
        headerTitleStyle: { flex: 1, textAlign: 'center',fontSize:17, ...headerTitleStyle },
        headerLeft: tabButton(leftIcon, onLeftPress || goBack, true, leftIconStyle),
        headerRight: headerRight || <View/>,
        headerStyle: headerStyle,
      }
    };

    render() {
      const title = get(this.props, 'navigation.state.params.title');
      return (
        <WrappedComponent title={title} {...this.props}/>
      );
    }
  };


