import React from 'react';
import { TouchableHighlight, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  highlight: {
    backgroundColor: 'white'
  }
})

export default class TouchButton extends React.Component {
  render() {
    const { style = {}, color, ...rest } = this.props
    return (
      <TouchableHighlight onPress={this._onPressButton} style={[ style ]} underlayColor={color || 'rgba(0,0,0, 0.05)'} {...rest} />
    )
  }
}
