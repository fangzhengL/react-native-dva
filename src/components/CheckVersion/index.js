/*
 * @Author: changge
 * @Date: 2018-07-26 15:35:02
 * @Last Modified by: changge
 * @Last Modified time: 2018-08-01 15:46:36
 */
import React from 'react';
import { TouchableHighlight, StyleSheet, Alert, Linking, Platform } from 'react-native';
import $dc from '@/dc';
import Toast from 'react-native-root-toast';
import JYToast from '@/utils/jy-toast';
import { PACKAGE_JSON } from '@/configs';
const fnCheckVersion = (comRef, fnErrCallback) => {
  $dc.oVersion
    .retrieveInfo({
      appVersion: PACKAGE_JSON.version,
      operatSystem: Platform.OS,
    })
    .then(
      res => {
        if (res && res.responseBody && res.responseBody.downUrl) {
          // let oButtons = [{ text: '立即更新', onPress: () => fnPressUpdate() }];
          // if (res && res.responseBody && !res.responseBody.upgradeState) {
          //   oButtons
          //     .unshift({ text: '稍后提示', onPress: () => console.log('Ask me later pressed') })
          //     .unshift({ text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel' });
          // }
          // Alert.alert('版本更新', res.responseBody.versionContent||'发现新版本，是否立即更新？', oButtons, { cancelable: false });
          comRef.init({
            content: res.responseBody.versionContent || '发现新版本，是否立即更新？',
            contentStyle: { fontWeight: 'normal', textAlign: 'left' },
            fnArgConfirm: () => {
              fnPressUpdate(res && res.responseBody && res.responseBody.downUrl);
            },
            fnArgCancel: () => {
              comRef.hide();
            },
            bShowCancelBtn: res && res.responseBody && res.responseBody.upgradeState != '1',
            confirmText: '立即更新',
            cancelText: '下次再说',
            disableClose: true,
          });
          comRef.show();
        } else {
          // JYToast('接口异常')
        }
      },
      err => {
        if (err && err.errorDesc) {
          if (fnErrCallback && typeof fnErrCallback === 'function') {
            fnErrCallback(err);
          }
        }
      }
    );
};
const fnPressUpdate = URL => {
  if (/^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i.test(URL)) {
    Linking.openURL(URL).catch(err => console.error('An error occurred', err));
  } else {
    JYToast('下载地址错误');
  }
};

export default fnCheckVersion;
