import React, {Component} from 'react';
import {Text, TouchableOpacity, View,StyleSheet} from 'react-native';
import {majorTextColor, pageBgColor} from '../../pages/constants/colors'
export default class RadioButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectBtn: props.initBtn&&parseInt(props.initBtn) || 0
    }
  }

  _button = (param, index) => {
    const {fnArgSelect, activeBtnColor, inactiveBtnStyle, inactiveDescStyle,btnCommonStyle, activeDescStyle,activeBtnStyle,activeDescColor, inactiveBtnColor, inactiveDescColor} = this.props;
    const {selectBtn} = this.state;
    let btnColor = inactiveBtnColor || "#F5F6F8";
    let textColor = inactiveDescColor || "#29354D";
    let btnStyle=inactiveBtnStyle;
    let descStyle=inactiveDescStyle;
    if (selectBtn === index) {
      btnColor = activeBtnColor || "#4A78F8";
      textColor = activeDescColor || "#fff";
      btnStyle=activeBtnStyle;
      descStyle=activeDescStyle

    }

    let value=param
    if(param instanceof Object) value=param[1]
    return (<TouchableOpacity key={index} style={[styles.btn,{backgroundColor: btnColor, borderColor: btnColor},btnCommonStyle,btnStyle]}
                              onPress={() => {
                                this.setState({
                                  selectBtn: index
                                });
                                fnArgSelect && fnArgSelect(param,index)
                              }
                              }>
      <Text style={[styles.desc,{color: textColor},descStyle]}>{value}</Text>
    </TouchableOpacity>)
  };


  render() {
    const {btnArr = [],containerStyle} = this.props;
    let newBtnArr=btnArr
    if (!(btnArr instanceof Array)) newBtnArr = Object.entries(btnArr);
    return (<View style={[styles.container,containerStyle]}>
      {newBtnArr.map(this._button)}
    </View>)
  }
}

const styles=StyleSheet.create({
  container:{flexDirection:"row"},
  btn:{
   width:68,
    height:30,
    backgroundColor:pageBgColor,
    borderRadius:15,
    justifyContent:'center',
    alignItems:"center"
  },
  desc:{
    fontSize:14,
    color:majorTextColor
  }
});
