import React from 'react';
import { Image } from 'react-native';

export default (sTabName) => (props) => {
  let tabIcon = null
  switch(sTabName) {
    case 'Home':
      tabIcon = props.focused ? <Image source={require('@/assets/images/home/icon_tab_shouye_active.png')} style={{ width: 24, height: 24 }} /> : <Image source={require('@/assets/images/home/icon_tab_shouye.png')} style={{ width: 24, height: 24 }} />;
      break;
    case 'Report':
      tabIcon = props.focused ? <Image source={require('@/assets/images/home/icon_tab_baobiao_active.png')} style={{ width: 24, height: 24 }} /> : <Image source={require('@/assets/images/home/icon_tab_baobiao.png')} style={{ width: 24, height: 24 }} />;
      break;
    case 'Custom':
      tabIcon = props.focused ? <Image source={require('@/assets/images/home/icon_tab_kehu_active.png')} style={{ width: 24, height: 24 }} /> : <Image source={require('@/assets/images/home/icon_tab_kehu.png')} style={{ width: 24, height: 24 }} />;
      break;
    case 'Product':
      tabIcon = props.focused ? <Image source={require('@/assets/images/home/icon_tab_chanpin_active.png')} style={{ width: 24, height: 24 }} /> : <Image source={require('@/assets/images/home/icon_tab_chanpin.png')} style={{ width: 24, height: 24 }} />;
      break;
    case 'Find':
      tabIcon = props.focused ? <Image source={require('@/assets/images/home/icon_tab_faxian_active.png')} style={{ width: 24, height: 24 }} /> : <Image source={require('@/assets/images/home/icon_tab_faxian.png')} style={{ width: 24, height: 24 }} />;
      break;
  }
  return tabIcon
}



