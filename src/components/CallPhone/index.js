import { Alert, Linking } from 'react-native';
import { fPhoneNumber } from '@/utils/filter'

let cellPhone = (number) => {
  let sNumber = number.toString() || ''
  sNumber = fPhoneNumber(sNumber)
  Alert.alert(
    null,
    sNumber,
    [
      {text: '取消', onPress: () => console.log('press cancel')},
      {text: '拨打', onPress: () => Linking.openURL('tel:' + number) },
    ]
  )
}

export default cellPhone