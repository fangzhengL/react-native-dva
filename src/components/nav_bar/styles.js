import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    paddingHorizontal: 12,
  },
  itemLeft: {
    justifyContent: 'flex-start',
  },
  itemRight: {
    justifyContent: 'flex-end',
  },
});
