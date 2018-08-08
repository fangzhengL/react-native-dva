import React, {createRef} from 'react';
import {View, Image, TouchableOpacity, TextInput, StyleSheet,Dimensions,Platform} from 'react-native'
const oldEixtIcon=require("./assets/images/icon_shanchu.png")
import {searchIcon} from "@/assets/images/customer";

const windowWidth= Dimensions.get('window').width

export default class SearchInput extends React.Component {
  constructor(){
    super()
    this.state={
      value:'',
    }
    this.inputRef=createRef()
  }


  _clear=()=>{
    this.inputRef.current.clear()
    this.setState({
      value:"",
    })
    const {fnArgOnChangeText}=this.props;
    fnArgOnChangeText&&fnArgOnChangeText("")
  }

  _onChangeText=(text)=>{
    const {fnArgOnChangeText}=this.props;
    this.setState({
      value:text
    })
    fnArgOnChangeText&&fnArgOnChangeText(text)
  };
  render() {
    const {
      containerStyle=styles.container,
      inputContainerStyle=styles.inputContainer,
      icon=searchIcon,
      iconStyle=styles.icon,
      inputStyle=styles.input,
      exitIcon=oldEixtIcon,
      exitIconStyle=styles.exitIcon,

    } =this.props

    const {value}=this.state

    return (<View style={containerStyle}>
      <View style={inputContainerStyle}>
        {value.length===0&&<Image source={icon} style={iconStyle}/>}
        <TextInput
          clearButtonMode={"always"}
          ref={this.inputRef}
          style={inputStyle}
          onChangeText={this._onChangeText}
          // value={value}
          {...this.props}
        />
      </View>
      {Platform.OS==='android'&&value.length>0&&<TouchableOpacity onPress={this._clear}>
        <Image source={exitIcon} style={exitIconStyle}/>
      </TouchableOpacity>}
    </View>)
  }
}

const styles = StyleSheet.create({
  container: {
    height: 34,
    width:windowWidth-80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: "#F1F1F2",
    borderRadius: 6,
    paddingRight: 10,
    paddingLeft: 10
  },
  inputContainer:{
    flexDirection:'row',
    flex:1,
    alignItems:'center',
  },
  icon:{
    width:16,
    height:16,
    resizeMode:"contain"
  },
  input:{
    padding:1,
    flex:1,
    fontSize:16,
    color:"#29354D"
  },
  exitIcon:{
    width:16,
    height:16,
    resizeMode:'contain'
  }

})
