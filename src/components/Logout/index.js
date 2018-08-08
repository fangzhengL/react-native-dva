/*
 * @Author: changge
 * @Date: 2018-07-17 14:44:35
 * @Last Modified by: changge
 * @Last Modified time: 2018-07-20 20:08:30
 */
import { AsyncStorage ,NativeModules} from 'react-native';
const NativeSaveUserInfo=NativeModules.SaveUserInfo;
export default function(navigation) {
  if (!navigation) return false;
  AsyncStorage.removeItem('onlyId');
  AsyncStorage.removeItem('userInfoList');
  AsyncStorage.removeItem('creditList');
  NativeSaveUserInfo.cleanUserInfo();
  navigation.navigate('Auth');
}
