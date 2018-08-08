import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import PropTypes from 'prop-types';
import TouchableItem from '../touchable_item';
import { errorImg } from "./assets";
import RadiusBtn from '../radius_button';

export default class netWorkError extends Component {

  static propTypes = {
    onPress: PropTypes.func.isRequired,
  };

  render() {
    const { onPress } = this.props;
    return (
      <View style={{width: '100%', height: '100%', backgroundColor: 'white', flex: 1, justifyContent: 'center', alignItems: 'center', position: 'absolute' }}>
        <Image source={errorImg}/>
        <Text style={{
          fontSize: 16,
          color: '#999999',
        }}>网络连接错误</Text>
        <RadiusBtn
          title={'刷新试试'}
          buttonStyle={{
            marginTop: 20,
            width: 181,
            height: 40,
            borderRadius: 20,
            borderColor: '#4A78F8',
            borderWidth: 1,
          }}
          titleStyle={{ fontSize: 16, color: '#4A78F8' }}
          onPress={onPress}
        />
      </View>
    );
  }
}
