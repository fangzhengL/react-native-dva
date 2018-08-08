import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Image,
  Text,
  ViewPropTypes,
} from 'react-native';
import TouchableItem from '../touchable_item'
import styles from './styles';

const noop = () => {};

const HIT_SLOP = { top: 10, bottom: 10, left: 10, right: 10 };

export const NavBarItem = (props) => {
  const { title, icon, onPress, titleStyle, iconStyle, leftOrRight = true } = props;
  return (
    <TouchableItem
      hitSlop={HIT_SLOP}
      onPress={(...args) => {
        onPress(...args);
      }}
    >
      <View style={[styles.item, leftOrRight ? styles.itemLeft : styles.itemRight]} >
        {
          !icon ? null :
            <Image
              style={[iconStyle, leftOrRight ? styles.navBarLeft : styles.navBarRight]}
              source={icon}
            />
        }
        {
          !title ? null :
            <Text
              style={[leftOrRight ? styles.navBarLeft : styles.navBarRight,
                titleStyle]}
            >
              {title}
            </Text>
        }
      </View>
    </TouchableItem>
  );
};

NavBarItem.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.number,
  titleStyle: ViewPropTypes.style,
  iconStyle: ViewPropTypes.style,
  onPress: PropTypes.func,
  leftOrRight: PropTypes.bool,
};

NavBarItem.defaultProps = {
  title: '',
  icon: undefined,
  titleStyle: undefined,
  iconStyle: undefined,
  onPress: noop,
  leftOrRight: true,
};
