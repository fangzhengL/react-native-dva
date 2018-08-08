import React from 'react';
import {View, ScrollView, Image, TouchableOpacity, Text, StyleSheet, Dimensions} from 'react-native'
import RefreshIndicator from '../RefreshIndicator'

const netErrorIcon = require('./assets/image/icon_app_wangluocuowu.png')
const pageLoseIcon = require('./assets/image/icon_app_yemianzoudiul.png')
const emptyDataIcon = require('./assets/image/zanwukehu.png')
const emptySearchIcon=require('./assets/image/icon_wujieguo.png')
const windowWidth = Dimensions.get('window').width
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: windowWidth,
    alignItems: 'center',
    backgroundColor: "#fff"
  },
  image1: {
    width: 195,
    height: 133,
    resizeMode: "contain"
  },
  image2: {
    width: 375,
    height: 284,
    resizeMode: 'contain'
  },
  text: {
    fontSize: 16,
    color: "#999999"
  },
  btn: {
    width: 181,
    height: 40,
    borderColor: "#4A78F8",
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginTop: 20
  },
  btnText: {
    fontSize: 16,
    color: "#4A78F8"
  }
})
const STATUS = {
  1: {
    desc: "网络异常",
    icon: netErrorIcon,
    iconStyle: styles.image1,
    containerStyle: {paddingTop: 50}
  },

  2: {
    desc: "页面走丢了",
    icon: pageLoseIcon,
    iconStyle: styles.image2,

  },
  3: {
    desc: "暂无数据",
    icon: emptyDataIcon,
    iconStyle: styles.image1,
    containerStyle: {paddingTop: 50}
  },
  4: {
    desc: "暂无搜索结果",
    icon: emptySearchIcon,
    iconStyle: styles.image1,
    containerStyle: {paddingTop: 50}
  }
}

export const defaultPage = ({
                              status = 1,//状态值常量STATUS相对应
                              defaultIcon,//显示的图片
                              fnArg, //按钮回调函数
                              fnOnRefresh, //刷新回调函数
                              bRefresh,  //刷新状态控制true/false
                              btnDescText, //按钮中的描述文字
                              descText  //默认页面描述文字 参见常亮 STATUS
                            } = {}) => {
  let btnText = btnDescText || "刷新试试";
  let desc = descText || STATUS[status].desc
  let icon = defaultIcon || STATUS[status].icon
  let iconStyle = STATUS[status].iconStyle
  let containerStyle = STATUS[status].containerStyle
  let oViewProps = fnOnRefresh ? {
    contentContainerStyle:[styles.container, containerStyle],
  refreshControl: <RefreshIndicator
      refreshing={bRefresh}
      onRefresh={fnOnRefresh}
    />
  } : {style:[styles.container, containerStyle]}
  let DefaultComponent=fnOnRefresh?ScrollView:View
  return (<DefaultComponent {...oViewProps}>
    <Image source={icon} style={iconStyle}/>
    <Text style={styles.text}>{desc}</Text>
    {fnArg && <TouchableOpacity onPress={fnArg && fnArg} style={styles.btn}>
      <Text style={styles.btnText}>{btnText}</Text>
    </TouchableOpacity>}
  </DefaultComponent>)
}


