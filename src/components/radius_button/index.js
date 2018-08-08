/**
 * Created by liangfangzheng on 2018/7/4.
 */
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import  TouchableItem  from '../touchable_item';


export default class ButtonRadius extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    buttonStyle: PropTypes.number,
    titleStyle: PropTypes.number,
    onPress: PropTypes.func.isRequired
  };

  render() {
    const {buttonStyle, titleStyle, title, onPress} = this.props;
    return (
      <TouchableItem
        onPress={onPress}
        style={[ buttonStyle, {justifyContent: 'center', alignItems: 'center'} ] }>
        <Text style={[ titleStyle, {textAlign: 'center'} ]}>{title}</Text>
      </TouchableItem>
    )
  }
}
